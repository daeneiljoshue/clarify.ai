
# Generated by Django 3.2.16 on 2023-02-02 18:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0062_delete_previews'),
    ]

    operations = [
        migrations.DeleteModel(
            name='JobCommit',
        ),
    ]