
# Generated by Django 3.2.16 on 2022-11-30 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0060_alter_label_parent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labeledshape',
            name='type',
            field=models.CharField(choices=[('rectangle', 'RECTANGLE'), ('polygon', 'POLYGON'), ('polyline', 'POLYLINE'), ('points', 'POINTS'), ('ellipse', 'ELLIPSE'), ('cuboid', 'CUBOID'), ('mask', 'MASK'), ('skeleton', 'SKELETON')], max_length=16),
        ),
        migrations.AlterField(
            model_name='trackedshape',
            name='type',
            field=models.CharField(choices=[('rectangle', 'RECTANGLE'), ('polygon', 'POLYGON'), ('polyline', 'POLYLINE'), ('points', 'POINTS'), ('ellipse', 'ELLIPSE'), ('cuboid', 'CUBOID'), ('mask', 'MASK'), ('skeleton', 'SKELETON')], max_length=16),
        ),
    ]