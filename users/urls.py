from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    MyTokenObtainPairView,
    register_view,
    user_profile_view,
    admin_user_list_view,
    admin_user_detail_view,
)

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_view, name='register'),
    path('profile/', user_profile_view, name='profile'),
    path('admin/users/', admin_user_list_view, name='admin_users'),
    path('admin/users/<int:pk>/', admin_user_detail_view, name='admin_user_detail'),
]
