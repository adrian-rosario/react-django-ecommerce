from rest_framework import serializers
from django.contrib.auth.models import User 
from .models import Product, Review, Order, OrderItem, ShippingAddress, Review
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ReviewSerializer(serializers.ModelSerializer):   
  class Meta:
    model = Review
    fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
  reviews = serializers.SerializerMethodField(read_only=True)
  
  class Meta:
    model = Product 
    fields = '__all__'
    
  def get_reviews(self, obj):
    reviews = obj.review_set.all()
    serializer = ReviewSerializer(reviews, many=True)
    return serializer.data

class OrderSerializer(serializers.ModelSerializer): 
  order = serializers.SerializerMethodField(read_only=True)  
  shippingAddress = serializers.SerializerMethodField(read_only=True)
  user = serializers.SerializerMethodField(read_only=True)  
  class Meta:
    model = Order
    fields = '__all__'
    
  def get_order(self, obj):
    items = obj.orderitem_set.all()
    serializer = OrderItemSerializer(items, many=True)
    return serializer.data
    
  def get_shippingAddress(self, obj):
    try:
      address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
    except:
      address = False
    return address
  
  def get_user(self,obj):
    user = obj.user
    serializer = UserSerializer(user, many=False)
    return serializer.data
      
class OrderItemSerializer(serializers.ModelSerializer):   
  class Meta:
    model = OrderItem
    fields = '__all__'
        
class ShippingAddressSerializer(serializers.ModelSerializer):   
  class Meta:
    model = ShippingAddress
    fields = '__all__'
    
class UserSerializer(serializers.ModelSerializer):   
  name = serializers.SerializerMethodField(read_only=True)
  is_admin = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'name', 'is_admin']
  
  def get_is_admin(self,obj):
    is_admin = obj.is_staff
    return is_admin  
    
  def get_name(self, obj):
    name = obj.first_name
    if name == '':
      name = obj.email
      
    return name
    
class UserWithRefreshTokenSerializer(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)
  # token = RefreshToken()
      # RefreshToken

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'name', 'is_admin', 'token']
      
  def get_token(self, obj):
    token = RefreshToken.for_user(obj)
    return str(token.access_token)
  
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)
    
    # data['username'] = self.user.username
    # data['email'] = self.user.email
    serializer = UserWithRefreshTokenSerializer(self.user).data
    
    for k,v in serializer.items():
      data[k] = v
    
    return data  
  