from django.apps import apps
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('clarify.apps.engine.urls')),
    path('django-rq/', include('django_rq.urls')),
]

if apps.is_installed('clarify.apps.log_viewer'):
    urlpatterns.append(path('', include('clarify.apps.log_viewer.urls')))

if apps.is_installed('cvat.apps.events'):
    urlpatterns.append(path('api/', include('clarify.apps.events.urls')))

if apps.is_installed('cvat.apps.lambda_manager'):
    urlpatterns.append(path('', include('clarify.apps.lambda_manager.urls')))

if apps.is_installed('cvat.apps.webhooks'):
    urlpatterns.append(path('api/', include('cvat.apps.webhooks.urls')))

if apps.is_installed('cvat.apps.quality_control'):
    urlpatterns.append(path('api/', include('cvat.apps.quality_control.urls')))

if apps.is_installed('silk'):
    urlpatterns.append(path('profiler/', include('silk.urls')))

if apps.is_installed('health_check'):
    urlpatterns.append(path('api/server/health/', include('health_check.urls')))

if apps.is_installed('cvat.apps.analytics_report'):
    urlpatterns.append(path('api/', include('cvat.apps.analytics_report.urls')))