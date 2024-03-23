
from django.apps import AppConfig


class WebhooksConfig(AppConfig):
    name = "clarify.apps.webhooks"

    def ready(self):
        from . import signals  # pylint: disable=unused-import