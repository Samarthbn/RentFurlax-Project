from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Customer,Category,Product,Invoice
import requests

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['type','image']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        options = validated_data.pop('options', None)
        if options and 'image_url' in options:
            image_url = options.get('image_url')
            imgbb_image_url = self.convert_to_imgbb(image_url)
            options['image_url'] = imgbb_image_url
            validated_data['options'] = options
        return super().create(validated_data)

    def convert_to_imgbb(self, image_url):
        try:
            response = requests.post("https://api.imgbb.com/1/upload?key=6749d18150c196def9981d9d87eeb27f", json={"url": image_url})
            image_data = response.json()
            imgbb_image_url = image_data['data']['url']
            return imgbb_image_url
        except Exception as e:
            return None  

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'


       