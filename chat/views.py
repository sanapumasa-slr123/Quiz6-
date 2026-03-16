from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from openai import OpenAI
from django.conf import settings


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_chatbot_view(request):
    try:
        message = request.data.get('message', '').strip()
        
        if not message:
            return Response(
                {'detail': 'Message is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {
                    'role': 'system',
                    'content': 'You are a helpful assistant for a Fence & Deck Services marketplace. Answer only questions about fence and deck services, how to hire experts, pricing, how to become a seller, or how to place orders. Decline anything outside this scope.'
                },
                {
                    'role': 'user',
                    'content': message
                }
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        reply = response.choices[0].message.content
        
        return Response(
            {'reply': reply},
            status=status.HTTP_200_OK
        )
    
    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
