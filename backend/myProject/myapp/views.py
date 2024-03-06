from datetime import timezone
from django.http import JsonResponse
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db import DatabaseError
from .models import Customer, Category, Product, Invoice
from .serializers import CustomerSerializer, CategorySerializer, ProductSerializer,InvoiceSerializer
from rest_framework.permissions import IsAdminUser
from django.utils import timezone


#cutomer section
@api_view(['POST'])
def customer_registration(request):
    serializer = CustomerSerializer(data=request.data)
    try:
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'message': 'Username and email already exist'}, status=status.HTTP_400_BAD_REQUEST)


#login user
@api_view(['POST'])
def customer_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Retrieve the user from the database based on the username
    user = Customer.objects.filter(username=username).first()

    if user and check_password(password, user.password):
        # Update the last_logged_in field
        user.last_logged_in = timezone.now()
        user.save()
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# create category
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_category(request):
    try:
        # Retrieve data from JSON payload
        category_type = request.data.get('type', '').lower()
        image_file = request.data.get('image')

        # Ensure proper encoding for file upload
        if not request.FILES.get('image'):
            return Response({"image": ["The submitted data was not a file. Check the encoding type on the form."]}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new Category instance with the provided data
        category_data = {'type': category_type, 'image': image_file}

        # Serialize the data and save
        serializer = CategorySerializer(data=category_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except DatabaseError as e:
        error_message = str(e)
        return Response({"error": "Database error", "details": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    


# view categories
@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


#create the product
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View Product by Category
@api_view(['GET'])
def get_products_by_category(request, category_name):
    
    try:        
        category = Category.objects.get(type=category_name)
        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products, many=True)        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Category.DoesNotExist:
        return Response({'error': f'Category "{category_name}" does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': 'An error occurred while retrieving products'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# creating the invoice
@api_view(["POST"])
def create_invoice(request):
    if request.method == 'POST':
        data = request.data 
        username = data.get('username')
        status = data.get('status')
        selected_items = ', '.join([item['name'] for item in data.get('selectedItems', [])])
        total_amount = data.get('total_amount')
        print(total_amount)
        
        # Save the order to the database
        order = Invoice.objects.create(
            username=username,
            status=status,
            selectedItems=selected_items,
            total_amount = total_amount,        
        )

        return JsonResponse({'message': 'Order received successfully'}, status=201)
    else:
        # Return an error response if the request method is not POST
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


# View Invoice
@api_view(['GET'])
def invoice_list(request, username):    
    try:       
        invoice = Invoice.objects.filter(username=username).first()   
        serializer = InvoiceSerializer(invoice)
        print(serializer)
        return Response(serializer.data)       
    except Invoice.DoesNotExist:
        return Response({"error": "Invoice not found"}, status=status.HTTP_404_NOT_FOUND)




    
