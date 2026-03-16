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
            'Hello! I can definitely help with that.\n\n'
            'Here is what I can do for you on this marketplace:\n'
            '1. Help you choose the right electrical service based on your issue.\n'
            '2. Explain pricing and what affects total cost.\n'
            '3. Guide you step by step through booking and payment.\n'
            '4. Help sellers understand the application and service posting flow.\n\n'
            'If you want, tell me your exact electrical problem and I will give you a practical plan.'
        )

    if any(word in text for word in ['hire', 'book', 'find', 'electrician']):
        return (
            'Great question. Here is a practical step-by-step way to hire the right electrician:\n\n'
            'Step 1: Open the home page and shortlist 2-3 services that match your exact issue (installation, repair, inspection).\n'
            'Step 2: Compare price, duration, and service description in each service detail page.\n'
            'Step 3: Pick the service that best fits urgency and budget, then proceed to PayPal checkout.\n'
            'Step 4: After payment, confirm your order in Profile -> Order History.\n\n'
            'Pro tip: If your issue is urgent or safety-related, choose a service with clear troubleshooting coverage and shorter duration.'
        )

    if any(word in text for word in ['price', 'cost', 'budget']):
        return (
            'Pricing usually depends on three things: scope, time required, and materials.\n\n'
            'A quick estimate method:\n'
            '1. Start with the listed service price.\n'
            '2. Add possible extra material costs if your job needs replacements.\n'
            '3. Reserve a small buffer (10-20%) for unexpected findings.\n\n'
            'For the most accurate total, open the service details and compare multiple sellers before checkout.'
        )

    if any(word in text for word in ['seller', 'apply', 'application']):
        return (
            'To become a seller, follow this flow:\n\n'
            '1. Sign in with a normal user account.\n'
            '2. Open "Apply as Seller" and submit your application.\n'
            '3. Wait for admin review (approved or declined with reason).\n'
            '4. If approved, your role changes to seller and you can post/manage services in Seller Dashboard.\n\n'
            'If you want, I can also suggest what to include in service descriptions to attract more buyers.'
        )

    if any(word in text for word in ['order', 'buy', 'paypal', 'checkout']):
        return (
            'To place an order successfully:\n\n'
            '1. Open a service detail page.\n'
            '2. Click the PayPal button and complete payment.\n'
            '3. Wait for payment confirmation in the app.\n'
            '4. Check your Profile -> Order History for the completed order record.\n\n'
            'If payment does not appear in order history, I can help you troubleshoot step by step.'
        )

    return (
        'I can help with marketplace topics like services, pricing, seller onboarding, and orders.\n\n'
        'Try asking in this format for a better answer:\n'
        '- "Help me choose a service for [problem]."\n'
        '- "Give me a budget estimate for [job]."\n'
        '- "Guide me through booking and payment."'
    )


def _normalize_history(history):
    if not isinstance(history, list):
        return []

    normalized = []
    for item in history[-12:]:
        if not isinstance(item, dict):
            continue
        role = item.get('role')
        content = item.get('content', '')
        if role not in ['user', 'assistant']:
            continue
        if not isinstance(content, str):
            continue
        text = content.strip()
        if not text:
            continue
        normalized.append({'role': role, 'content': text})
    return normalized


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_chatbot_view(request):
    message = request.data.get('message', '').strip()
    history = _normalize_history(request.data.get('history', []))

    if not message:
        return Response(
            {'detail': 'Message is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not settings.OPENAI_API_KEY:
        return Response({'reply': _fallback_reply(message)}, status=status.HTTP_200_OK)

    try:
        client = OpenAI(api_key=settings.OPENAI_API_KEY)

        system_prompt = (
            'You are an expert assistant for an Electrical Services marketplace. '
            'You must answer only topics related to electrical/home services, hiring experts, pricing, '
            'seller onboarding, profiles, orders, payments, and troubleshooting platform usage. '
            'If asked outside scope, politely decline and redirect to platform topics. '
            'Write responses in a clear, practical, helpful style. '
            'Prefer short sections and concise bullet points when useful. '
            'When user asks broad questions, provide step-by-step guidance and practical next actions.'
        )

        messages = [
            {
                'role': 'system',
                'content': system_prompt,
            }
        ]
        messages.extend(history)
        messages.append({'role': 'user', 'content': message})

        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=messages,
            max_tokens=900,
            temperature=0.8
        )

        reply = response.choices[0].message.content or _fallback_reply(message)

        return Response(
            {'reply': reply},
            status=status.HTTP_200_OK
        )

    except Exception:
        # Keep chatbot usable even if upstream AI fails.
        return Response({'reply': _fallback_reply(message)}, status=status.HTTP_200_OK)
