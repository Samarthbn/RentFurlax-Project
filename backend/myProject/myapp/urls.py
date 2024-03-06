from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from .views import *

urlpatterns = [

    path('', customer_registration, name='customer_registration'),
    
    path('register/', customer_registration, name='customer_registration'),
    path('login/', customer_login, name='customer_login'),
    
    path('category/', create_category, name='create_category'),
    path('product/', create_product, name='create_product'),

    path('categories/', get_categories, name='get_categories'),
    path('invoice/', create_invoice, name='create_invoice'),

    path('invoices/<str:username>/', invoice_list, name='invoice_list'),
    path('<str:category_name>/',get_products_by_category, name='get_products_by_category'),

]

