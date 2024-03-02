
# Generated by Django 3.2.11 on 2022-02-02 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0048_auto_20211112_1918'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labeledshape',
            name='type',
            field=models.CharField(choices=[('rectangle', 'RECTANGLE'), ('polygon', 'POLYGON'), ('polyline', 'POLYLINE'), ('points', 'POINTS'), ('ellipse', 'ELLIPSE'), ('cuboid', 'CUBOID')], max_length=16),
        ),
        migrations.AlterField(
            model_name='trackedshape',
            name='type',
            field=models.CharField(choices=[('rectangle', 'RECTANGLE'), ('polygon', 'POLYGON'), ('polyline', 'POLYLINE'), ('points', 'POINTS'), ('ellipse', 'ELLIPSE'), ('cuboid', 'CUBOID')], max_length=16),
        ),
    ]