from .base import *

DEBUG = False

NUCLIO['HOST'] = os.getenv('CLARIFY_NUCLIO_HOST', 'nuclio')

# Django-sendfile:
# https://github.com/moggers87/django-sendfile2
SENDFILE_BACKEND = 'django_sendfile.backends.nginx'