
# Generated by Django 3.2.15 on 2022-09-09 09:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0059_labeledshape_outside'),
    ]

    operations = [
        migrations.AlterField(
            model_name='label',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sublabels', to='engine.label'),
        ),
    ]