from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
import uuid
from .models import SellerApplication
from .serializers import SellerApplicationSerializer
from users.permissions import IsAdmin

User = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_application_view(request):
    try:
        application, created = SellerApplication.objects.get_or_create(user=request.user)
        if not created and application.status != 'pending':
            return Response(
                {'detail': 'You have already applied or been approved.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        application.status = 'pending'
        application.save()
        serializer = SellerApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdmin])
def list_applications_view(request):
    applications = SellerApplication.objects.filter(status='pending')
    serializer = SellerApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdmin])
def approve_application_view(request, pk):
    try:
        application = SellerApplication.objects.get(pk=pk)
    except SellerApplication.DoesNotExist:
        return Response({'detail': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    user = application.user
    user.role = 'seller'
    user.merchant_id = uuid.uuid4().hex[:12].upper()
    user.save()
    
    application.status = 'approved'
    application.save()
    
    serializer = SellerApplicationSerializer(application)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdmin])
def decline_application_view(request, pk):
    try:
        application = SellerApplication.objects.get(pk=pk)
    except SellerApplication.DoesNotExist:
        return Response({'detail': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    decline_reason = request.data.get('decline_reason', '')
    if not decline_reason:
        return Response(
            {'detail': 'Decline reason is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    application.status = 'declined'
    application.decline_reason = decline_reason
    application.save()
    
    serializer = SellerApplicationSerializer(application)
    return Response(serializer.data, status=status.HTTP_200_OK)
