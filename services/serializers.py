from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    seller_name = serializers.SerializerMethodField()
    sample_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ('id', 'seller', 'seller_name', 'service_name', 'description', 'price', 'duration_of_service', 'sample_image', 'rating')
        read_only_fields = ('id', 'seller')
    
    def get_seller_name(self, obj):
        return f"{obj.seller.first_name} {obj.seller.last_name}"
    
    def get_sample_image(self, obj):
        request = self.context.get('request')
        if obj.sample_image:
            image_url = obj.sample_image.url
            if request is not None:
                return request.build_absolute_uri(image_url)
            return f"http://localhost:8000{image_url}"
        return None
