
# Generated by Django 2.1.7 on 2019-04-17 09:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('engine', '0017_db_redesign_20190221'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobCommit',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('version', models.PositiveIntegerField(default=0)),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('message', models.CharField(default='', max_length=4096)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commits', to='engine.Job')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
    ]