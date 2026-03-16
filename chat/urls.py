from django.urls import path
from .views import ai_chatbot_view

urlpatterns = [
    path('ask/', ai_chatbot_view, name='ask'),
]
