
# Generated by Django 3.2.12 on 2022-05-20 09:21

import clarify.apps.engine.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0052_alter_cloudstorage_specific_attributes'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='deleted_frames',
            field=clarify.apps.engine.models.IntArrayField(default=''),
        ),
    ]