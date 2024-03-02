
# Generated by Django 3.2.18 on 2023-06-08 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0068_auto_20230418_0901'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labeledimage',
            name='source',
            field=models.CharField(choices=[('auto', 'AUTO'), ('semi-auto', 'SEMI_AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True),
        ),
        migrations.AlterField(
            model_name='labeledshape',
            name='source',
            field=models.CharField(choices=[('auto', 'AUTO'), ('semi-auto', 'SEMI_AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True),
        ),
        migrations.AlterField(
            model_name='labeledtrack',
            name='source',
            field=models.CharField(choices=[('auto', 'AUTO'), ('semi-auto', 'SEMI_AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True),
        ),
    ]