from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from openai import OpenAI
from django.conf import settings


def _fallback_reply(message):
    text = message.lower()

    if any(word in text for word in ['hello', 'hi', 'hey']):
        return (
            'Hello! I can help you with services, pricing, hiring sellers, and placing orders on this platform.'
        )

    if any(word in text for word in ['price', 'cost', 'budget']):
        return (
            'Service pricing depends on scope, duration, and seller rates. Open a service detail page to see exact pricing before checkout.'
        )

    if any(word in text for word in ['seller', 'apply', 'application']):
        return (
            'To become a seller, sign in as a user and submit the seller application. Admin review can approve or decline your request.'
        )

    if any(word in text for word in ['order', 'buy', 'paypal', 'checkout']):
        return (
            'To place an order, open a service detail page, proceed with PayPal, then your purchase will appear in your profile order history.'
        )

    return (
        'I can help with marketplace topics: services, pricing, seller applications, and orders. Please ask about one of these.'
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_chatbot_view(request):
    message = request.data.get('message', '').strip()

    if not message:
        return Response(
            {'detail': 'Message is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not settings.OPENAI_API_KEY:
        return Response({'reply': _fallback_reply(message)}, status=status.HTTP_200_OK)

    try:
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

        reply = response.choices[0].message.content or _fallback_reply(message)

        return Response(
            {'reply': reply},
            status=status.HTTP_200_OK
        )

    except Exception:
        # Keep chatbot usable even if upstream AI fails.
        return Response({'reply': _fallback_reply(message)}, status=status.HTTP_200_OK)
