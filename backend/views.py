from django.http import JsonResponse


def api_root_view(request):
    return JsonResponse(
        {
            'message': 'Electrical Services API v1',
            'endpoints': {
                'users': '/api/v1/users/',
                'applications': '/api/v1/applications/',
                'services': '/api/v1/services/',
                'orders': '/api/v1/orders/',
                'chat': '/api/v1/chat/',
            },
        }
    )
