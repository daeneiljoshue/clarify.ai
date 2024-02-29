
from django.apps import AppConfig


class EventsConfig(AppConfig):
    name = 'clarify.apps.events'

    def ready(self):
        from . import signals  # pylint: disable=unused-import