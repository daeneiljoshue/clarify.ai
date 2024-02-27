import clarify.apps.webhooks.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('engine', '0060_alter_label_parent'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('organizations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Webhook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target_url', models.URLField()),
                ('description', models.CharField(blank=True, default='', max_length=128)),
                ('events', models.CharField(default='', max_length=4096)),
                ('type', models.CharField(choices=[('organization', 'ORGANIZATION'), ('project', 'PROJECT')], max_length=16)),
                ('content_type', models.CharField(choices=[('application/json', 'JSON')], default=clarify.apps.webhooks.models.WebhookContentTypeChoice['JSON'], max_length=64)),
                ('secret', models.CharField(blank=True, default='', max_length=64)),
                ('is_active', models.BooleanField(default=True)),
                ('enable_ssl', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('organization', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='organizations.organization')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='engine.project')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='WebhookDelivery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.CharField(max_length=64)),
                ('status_code', models.CharField(max_length=128, null=True)),
                ('redelivery', models.BooleanField(default=False)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('changed_fields', models.CharField(default='', max_length=4096)),
                ('request', models.JSONField(default=dict)),
                ('response', models.JSONField(default=dict)),
                ('webhook', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deliveries', to='webhooks.webhook')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.AddConstraint(
            model_name='webhook',
            constraint=models.CheckConstraint(check=models.Q(models.Q(('project_id__isnull', False), ('type', 'project')), models.Q(('organization_id__isnull', False), ('project_id__isnull', True), ('type', 'organization')), _connector='OR'), name='webhooks_project_or_organization'),
        ),
    ]