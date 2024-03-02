
# Generated by Django 3.1.13 on 2021-12-03 08:06

import clarify.apps.engine.models
from django.db import migrations, models


class Migration(migrations.Migration):
    replaces = [('engine', '0045_data_sorting_method')]

    dependencies = [
        ('engine', '0045_auto_20211123_0824'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='sorting_method',
            field=models.CharField(choices=[('lexicographical', 'LEXICOGRAPHICAL'), ('natural', 'NATURAL'), ('predefined', 'PREDEFINED'), ('random', 'RANDOM')], default=clarify.apps.engine.models.SortingMethod['LEXICOGRAPHICAL'], max_length=15),
        ),
    ]