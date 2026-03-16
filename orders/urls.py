from django.urls import path
from .views import create_order_view, user_order_history_view

urlpatterns = [
    path('create/', create_order_view, name='create'),
    path('history/', user_order_history_view, name='history'),
]
