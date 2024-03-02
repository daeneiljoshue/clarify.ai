
# Generated by Django 2.2.10 on 2020-07-19 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0026_auto_20200719_1511'),
    ]

    operations = [
        migrations.AddField(
            model_name='labeledimage',
            name='source',
            field=models.CharField(choices=[('auto', 'AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True),
        ),
        migrations.AddField(
            model_name='labeledshape',
            name='source',
            field=models.CharField(choices=[('auto', 'AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True),
        ),
        migrations.AddField(
            model_name='labeledtrack',
            name='source',
            field=models.CharField(choices=[('auto', 'AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True),
        ),
    ]