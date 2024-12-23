from ecomm_app.models import Product, Review, Order, OrderItem, ShippingAddress
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ecomm_app.serializers import ProductSerializer, ReviewSerializer, OrderSerializer, OrderItemSerializer, ShippingAddressSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def list_products(request):
  
  # adding query 
  query = request.query_params.get('search')
  if query:
    print('query: ', query)
  if query == None:
    query = ''

  products = Product.objects.filter(name__icontains = query)
  # icontains - case insensitive 
  
  # pagination 
  page = request.query_params.get('page')
  paginator = Paginator(products, 4) # number of items per pagination
  try: 
    products = paginator.page(page)
  except PageNotAnInteger: 
    products = paginator.page(1) # ie. no value sent, choose first page
  except EmptyPage: # ie. if number out of bounds, choose last page 
    products = paginator.page(paginator.num_pages)
    
  if page == None:
    page = 1 
    
  page = int(page)
  
  
  # products = Product.objects.all()
  # print('loaded products ', products)
  serializer = ProductSerializer(products, many=True)
  # return Response(serializer.data) # before pagination 
  
  return Response({
    'products': serializer.data, 
    'page': page, 
    'pages': paginator.num_pages }) # after pagination 

# top products, for carousel
@api_view(['GET'])
def list_top_rated_products(request):
  products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5] # zero to top five products
  serializer = ProductSerializer(products, many=True)
  return Response(serializer.data)


@api_view(['GET'])
def list_product(request, id):
  product = Product.objects.get(id=id)
  # print('======= loaded product ', product)
  serializer = ProductSerializer(product, many=False)
  return Response(serializer.data)

@api_view(['GET'])
def list_review(request, id):
  review = Review.objects.get(id=id)
  # print('======= loaded review ', review)
  serializer = ReviewSerializer(review, many=False)
  return Response(serializer.data)

@api_view(['GET'])
def list_order(request, id):
  order = Order.objects.get(id=id)
  # print('======= loaded order ', order)
  serializer = OrderSerializer(order, many=False)
  return Response(serializer.data)

@api_view(['GET'])
def list_order_item(request, id):
  orderItem = OrderItem.objects.get(id=id)
  # print('======= loaded orderItem ', orderItem)
  serializer = OrderItemSerializer(orderItem, many=False)
  return Response(serializer.data)

@api_view(['GET'])
def list_order_item(request, id):
  shippingAddress = ShippingAddress.objects.get(id=id)
  # print('======= loaded shippingAddress ', shippingAddress)
  serializer = ShippingAddressSerializer(shippingAddress, many=False)
  return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def admin_delete_product(request, id):
  productToDelete = Product.objects.get(id=id)
  productToDelete.delete()
  return Response('Product deleted')
  
@api_view(['POST'])  
@permission_classes([IsAdminUser])  
def admin_add_product(request):
  data = request.data 
  user = request.user
  try: 
    product = Product.objects.create(
      name = data['name'],
      image = data['image'],
      description = data['description'],
      brand = data['brand'],
      category = data['category'],
      price = data['price'],
      countInStock = data['countInStock'],
      user = user
      )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
  except:
    message = {'detail':'There was a problem adding product'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])  
@permission_classes([IsAdminUser])  
def admin_add_empty_product(request):
  user = request.user
  try: 
    product = Product.objects.create(
      name = 'new product', 
      description = 'Enter item details.',
      brand = 'Radio Shack',
      category = 'Home Furnishings',
      price = '1', 
      countInStock = '0', 
      user = user
      )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
  except:
    message = {'detail':'There was a problem adding product'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])  
@permission_classes([IsAdminUser])
def admin_edit_product(request, id):
  # TODO: try catch ? 
  product = Product.objects.get(id=id)
  updateData = request.data 
  user = request.user
  product.name = updateData['name']
  product.image = updateData['image']
  product.description = updateData['description']
  product.brand = updateData['brand']
  product.category = updateData['category']
  product.price = updateData['price']
  product.countInStock = updateData['countInStock']  
  user = user
  product.save()
  serializer = ProductSerializer(product, many=False)
  return Response(serializer.data)

@api_view(['POST'])  
@permission_classes([IsAdminUser])
def uploadImage(request):
  data = request.data 
  product_id = data['productId']
  # print('**** Product Id: ', product_id)
  product = Product.objects.get(id=product_id)
  # print('**** The Product: ', product)
  product.uploadedImage = request.FILES.get('uploadedImage')
  product.save()
  return Response('Image uploaded successfully.')

@api_view(['POST'])  
@permission_classes([IsAuthenticated])
def createProductReview(request, id):
    theUser = request.user
    sentData = request.data
    theProduct = Product.objects.get(id=id)
    
    # 1. review exists 
    reviewExists = theProduct.review_set.filter(user=theUser).exists()
    
    if reviewExists:
      # user has already submitted a review for this item
      content = {'detail': 'You have already reviewed this product.'}
      return Response(content, status=status.HTTP_400_BAD_REQUEST)
      
    # 2. no rating or 0
    elif sentData['rating'] == 0:
      print('***** rating is equal to zero')
      content = {'detail': 'Please select a rating greater than zero'}
      return Response(content, status=status.HTTP_400_BAD_REQUEST)      
      
    
    # 3. create review 
    else: 
      review = Review.objects.create(
        product = theProduct,
        user = theUser,
        name = theUser.first_name,
        rating = sentData['rating'],
        comment = sentData['comment']
      )
      reviews = theProduct.review_set.all()
      theProduct.numReviews = len(reviews)
      
      total = 0
      for item in reviews:
        total += item.rating
      theProduct.rating = total / len(reviews)
      
      # review.save()
      theProduct.save()
      return Response({'Rating added successfully'}, status=status.HTTP_201_CREATED)