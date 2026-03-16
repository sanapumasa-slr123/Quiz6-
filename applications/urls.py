from django.urls import path
from .views import (
    submit_application_view,
    list_applications_view,
    approve_application_view,
    decline_application_view,
)

urlpatterns = [
    path('apply/', submit_application_view, name='apply'),
    path('list/', list_applications_view, name='list'),
    path('<int:pk>/approve/', approve_application_view, name='approve'),
    path('<int:pk>/decline/', decline_application_view, name='decline'),
]
