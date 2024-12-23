from django.urls import path
from ecomm_app.views import order_views as views

urlpatterns = [
    path('',views.place_order, name="place_order"),
    path('view/orders/', views.get_user_orders, name="view_orders"),
    path('admin-view/orders/', views.admin_get_orders, name="admin_view_orders"),
    path('admin-view/delete/<str:id>', views.admin_delete_order, name='admin_delete_order'),
    path('shipped/<str:id>', views.mark_order_as_sent, name="mar_order_as_sent"),
    path('view/<str:pk>', views.get_order_by_id, name="view_order"),
    path('view/<str:pk>/paid/', views.mark_order_as_paid, name="mark_order_as_paid"),
]