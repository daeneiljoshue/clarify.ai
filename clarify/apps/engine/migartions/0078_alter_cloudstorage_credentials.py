
# Generated by Django 4.2.6 on 2024-01-09 09:55

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("engine", "0077_auto_20231121_1952"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cloudstorage",
            name="credentials",
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
    ]