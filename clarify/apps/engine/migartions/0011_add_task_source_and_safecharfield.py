
# Generated by Django 2.0.9 on 2018-10-24 10:50

import clarify.apps.engine.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0010_auto_20181011_1517'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='source',
            field=clarify.apps.engine.models.SafeCharField(default='unknown', max_length=256),
        ),
        migrations.AlterField(
            model_name='label',
            name='name',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='labeledboxattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='labeledpointsattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='labeledpolygonattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='labeledpolylineattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='objectpathattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='task',
            name='name',
            field=clarify.apps.engine.models.SafeCharField(max_length=256),
        ),
        migrations.AlterField(
            model_name='trackedboxattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='trackedpointsattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='trackedpolygonattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
        migrations.AlterField(
            model_name='trackedpolylineattributeval',
            name='value',
            field=clarify.apps.engine.models.SafeCharField(max_length=64),
        ),
    ]