from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Order
from .serializers import OrderSerializer
from services.models import Service


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order_view(request):
    try:
        service_id = request.data.get('service')
        paypal_transaction_id = request.data.get('paypal_transaction_id')
        price_paid = request.data.get('price_paid')

        if not service_id or not paypal_transaction_id or not price_paid:
            return Response(
                {'detail': 'Missing required fields.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if transaction ID already exists
        if Order.objects.filter(paypal_transaction_id=paypal_transaction_id).exists():
            return Response(
                {'detail': 'This transaction has already been processed.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        service = get_object_or_404(Service, pk=service_id)

        order = Order.objects.create(
            buyer=request.user,
            service=service,
            paypal_transaction_id=paypal_transaction_id,
            price_paid=price_paid
        )

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_order_history_view(request):
    orders = Order.objects.filter(buyer=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
