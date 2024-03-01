
from django.apps import AppConfig


class EngineConfig(AppConfig):
    name = 'clarify.apps.engine'

    def ready(self):
        # Required to define signals in application
        import clarify.apps.engine.signals
        # Required in order to silent "unused-import" in pyflake
        assert clarify.apps.engine.signals