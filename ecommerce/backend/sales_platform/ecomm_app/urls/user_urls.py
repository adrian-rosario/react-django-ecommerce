from django.urls import path
from ecomm_app.views import user_views as views

urlpatterns = [
  path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('profile/', views.list_user_profile, name="user_profile"),
  path('', views.admin_list_users, name="admin_users_profile"),
  path('register/', views.register_user, name="user_register"),
  path('update/', views.update_user_profile, name="user_update"),
  path('delete/<str:pk>/', views.admin_delete_user, name="admin_user_delete"),
  path('admin/user-profile/<str:pk>/', views.admin_list_user_by_id, name="admin_list_user_by_id"),
  path('admin/update-user/<str:pk>/', views.admin_update_user_profile, name="admin_update_user_profile"),
 ]

