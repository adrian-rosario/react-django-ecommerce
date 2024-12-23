from django.urls import path
from ecomm_app.views import product_views as views

urlpatterns = [
  path('all-products/',views.list_products, name="get_products"),
  path('admin/add-product/', views.admin_add_product, name="admin_add_product"),
  path('admin/add-empty-product/', views.admin_add_empty_product, name="admin_empty_product"),
  path('admin/upload-product-image/', views.uploadImage, name="admin_product_image_upload"),
  path('top-products/', views.list_top_rated_products, name='top_rated_products'),
  path('admin/edit-product/<int:id>', views.admin_edit_product, name="admin_edit_product"),
  path('create-review/<int:id>',views.createProductReview, name="create_review"),
  path('product/<int:id>', views.list_product, name="get_product"),
  path('admin/delete-product/<int:id>', views.admin_delete_product, name="admin_delete_product"),
 ]

