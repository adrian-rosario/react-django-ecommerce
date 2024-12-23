from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ecomm_app.serializers import UserSerializer, UserWithRefreshTokenSerializer 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User 
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)
    
    # data['username'] = self.user.username
    # data['email'] = self.user.email
    serializer = UserWithRefreshTokenSerializer(self.user).data
    
    for k,v in serializer.items():
      data[k] = v
    
    return data 
      
class MyTokenObtainPairView(TokenObtainPairView):
  serializer_class = MyTokenObtainPairSerializer
  

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_profile(request):
  user = request.user # User.objects.all()
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_list_users(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def register_user(request):
  data = request.data 
  
  try:   
    user = User.objects.create(
      first_name = data['name'],
      username = data['email'],
      email = data['email'],
      password = make_password(data['password'])
    )
    serializer = UserWithRefreshTokenSerializer(user, many=False)
    return Response(serializer.data)
  except: 
    message = {'detail': 'This username already exists'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)  
  
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
  user = request.user 
  serializer = UserWithRefreshTokenSerializer(user, many=False)
  data = request.data
  user.first_name = data['name']
  user.email = data['email']
  user.username = data['email'] 
  if data['password'] != '':
    user.password = make_password(data['password'])
  user.save()
  return Response(serializer.data)  
  
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def admin_delete_user(request, pk):
  userToDelete = User.objects.get(id=pk) 
  userToDelete.delete()
  return Response('User deleted') 
  
@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_list_user_by_id(request, pk):
  user = User.objects.get(id=pk) 
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)
  
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def admin_update_user_profile(request, pk):
  user = User.objects.get(id=pk) 

  data = request.data
  user.first_name = data['name']
  user.email = data['email']
  user.username = data['email'] 
  user.is_staff = data['is_admin']
  user.save()

  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)  
   