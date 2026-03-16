from rest_framework.permissions import BasePermission


class IsSeller(BasePermission):
    """
    Permission to check if user is a seller.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'seller'


class IsAdmin(BasePermission):
    """
    Permission to check if user is an admin.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsSellerOrReadOnly(BasePermission):
    """
    Permission to allow sellers to create/edit, others to read.
    """
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user and request.user.is_authenticated and request.user.role == 'seller'
