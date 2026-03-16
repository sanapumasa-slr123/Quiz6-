from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Service
from .serializers import ServiceSerializer
from users.permissions import IsSeller


@api_view(['GET'])
@permission_classes([AllowAny])
def service_list_view(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def service_detail_view(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response({'detail': 'Service not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ServiceSerializer(service, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsSeller])
def seller_service_manage_view(request):
    if request.method == 'GET':
        services = Service.objects.filter(seller=request.user)
        serializer = ServiceSerializer(services, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = ServiceSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsSeller])
def seller_service_detail_view(request, pk):
    try:
        service = Service.objects.get(pk=pk, seller=request.user)
    except Service.DoesNotExist:
        return Response({'detail': 'Service not found or permission denied.'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ServiceSerializer(service, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = ServiceSerializer(service, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        service.delete()
        return Response({'detail': 'Service deleted.'}, status=status.HTTP_204_NO_CONTENT)
