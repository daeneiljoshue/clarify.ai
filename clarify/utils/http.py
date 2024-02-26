from django.conf import settings

import requests
import requests.utils

from clarify import __version__

_CLARIFY_USER_AGENT = f"CLARIFY/{__version__} {requests.utils.default_user_agent()}"

# Note that setting Session.proxies doesn't work correctly if an upstream proxy
# is specified via environment variables: <https://github.com/psf/requests/issues/2018>.
# Therefore, for robust operation, these need to be passed with every request via the
# proxies= parameter.
PROXIES_FOR_UNTRUSTED_URLS = None

if settings.SMOKESCREEN_ENABLED:
    PROXIES_FOR_UNTRUSTED_URLS = {
        'http': 'http://localhost:4750',
        'https': 'http://localhost:4750',
    }

def make_requests_session() -> requests.Session:
    session = requests.Session()
    session.headers['User-Agent'] = _CLARIFY_USER_AGENT
    return session