from django.shortcuts import render
from ecomm_app.models import Product, Order, OrderItem, ShippingAddress 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ecomm_app.serializers import OrderSerializer 
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
  user = request.user
  data = request.data
  cart = data['cart']
  
  if cart and len(cart) == 0:
    return Response({'detail':'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
  # ({'detail':'Cart is empty', status=status.HTTP_400_BAD_REQUEST})
  else:
    print('order, has cart items...')
    
    # TODO:
    # tax amount, and calculate total amount
    # using sent quantities
    
    order = Order.objects.create(
      user = user,
      paymentMethod = data['paymentMethod'],
      taxPrice = data['taxAmount'], # 🤔
      shippingPrice = data['shippingAmount'], # 🤔
      totalPrice = data['totalAmount'] # 🤔
    )
 
    for item in cart:
      retrieved_product = Product.objects.get(id=item['product'])
      order_item = OrderItem.objects.create(
        product = retrieved_product,
        order = order, # 🤔
        name = retrieved_product.name,
        quantity = item['quantity'],
        price = retrieved_product.price, # item['price'] 🤔
        image = retrieved_product.image,
      )
      
      # update stock 
      retrieved_product.countInStock -= int(order_item.quantity)
      # retrieved_product.save() 
      
    
    shipping = ShippingAddress.objects.create(
      order = order,
      address = data['shippingAddress']['address'], 
      city = data['shippingAddress']['city'], 
      zipCode = data['shippingAddress']['postalCode'], 
      country = data['shippingAddress']['country'], 
      shippingCharge = data['shippingAmount']# 🤔
    )
    
    serializer = OrderSerializer(order, many=False)
      
    return Response(serializer.data)  #('order!')
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def get_order_by_id(request, pk):
  user = request.user 
  
  try:
    order = Order.objects.get(id=pk)
    if user.is_staff or order.user == user:
      serializer = OrderSerializer(order, many=False)
      return Response(serializer.data)
    else:
      Response({'detail': 'Bad Request.'}, status=status.HTTP_400_BAD_REQUEST)  
  except:
    return Response({'detail': 'Bad Request. Order not found'}, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  
def mark_order_as_paid(request, pk):
  order = Order.objects.get(id=pk)
  order.isPaid = True
  order.paidDate = datetime.now()
  order.save()  
  return Response('Order marked as paid')


@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def get_user_orders(request):
  user = request.user 
  orders = user.order_set.all()
  serializer = OrderSerializer(orders, many=True)
  return Response(serializer.data)
  
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_get_orders(request):
  orders = Order.objects.all()
  serialzer = OrderSerializer(orders, many=True)
  return Response(serialzer.data)  

# TODO: create case for fulfillment users
@api_view(['PUT'])
@permission_classes([IsAdminUser])  
def mark_order_as_sent(request, id):
  order = Order.objects.get(id=id)
  order.isDelivered = True
  order.deliveredAt = datetime.now()
  order.save()  
  return Response('Order set to delivered.')

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def admin_delete_order(request, id):
  order = Order.objects.get(id=id)
  order.delete()
  return Response('Order deleted')