from django.urls import path
from .views import (
    service_list_view,
    service_detail_view,
    seller_service_manage_view,
    seller_service_detail_view,
)

urlpatterns = [
    path('list/', service_list_view, name='list'),
    path('<int:pk>/', service_detail_view, name='detail'),
    path('manage/', seller_service_manage_view, name='manage'),
    path('manage/<int:pk>/', seller_service_detail_view, name='manage_detail'),
]
