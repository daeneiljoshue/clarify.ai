
# Generated by Django 3.1.1 on 2020-09-14 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0029_data_storage_method'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pluginoption',
            name='plugin',
        ),
        migrations.DeleteModel(
            name='Plugin',
        ),
        migrations.DeleteModel(
            name='PluginOption',
        ),
    ]