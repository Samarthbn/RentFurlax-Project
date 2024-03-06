from datetime import timezone
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Customer(models.Model):  
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    password = models.CharField(max_length=128)  
    last_logged_in = models.DateTimeField(auto_now_add=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
         return self.username


class Category(models.Model):
    type = models.CharField(max_length=255, primary_key = True)
    image = models.ImageField(upload_to='myProject\static',null=True,blank=True)

    def __str__(self):
        return self.type


class Product(models.Model):
    name= models.CharField(max_length=255)
    description= models.TextField()
    condition= models.CharField(max_length=255)
    noofdays= models.IntegerField()
    category= models.ForeignKey(Category, on_delete=models.CASCADE)
    options= models.JSONField()
    rentaloptions= models.JSONField()

    def __str__(self):
        return self.name,self.category



class Invoice(models.Model):
    STATUS_CHOICES = (
        ('ORDERED', 'Ordered'),
        ('CANCELLED', 'Cancelled'),
        ('DELIVERED', 'Delivered'),
    )
    username = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    selectedItems=models.CharField((""), max_length=50)
    total_amount = models.DecimalField((""), max_digits=5, decimal_places=2)
    generated = models.DateTimeField(default=timezone.now)

