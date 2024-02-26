from clarify.settings.production import *


# https://github.com/pennersr/django-allauth
ACCOUNT_AUTHENTICATION_METHOD = 'username_email'
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'

# Email backend settings for Django
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'