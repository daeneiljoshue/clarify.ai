
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0001_release_v0_1_0'),
    ]

    operations = [
        migrations.CreateModel(
            name='LabeledPoints',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frame', models.PositiveIntegerField()),
                ('occluded', models.BooleanField(default=False)),
                ('points', models.TextField()),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Job')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Label')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LabeledPointsAttributeVal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=64)),
                ('points', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.LabeledPoints')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.AttributeSpec')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LabeledPolygon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frame', models.PositiveIntegerField()),
                ('occluded', models.BooleanField(default=False)),
                ('points', models.TextField()),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Job')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Label')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LabeledPolygonAttributeVal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=64)),
                ('polygon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.LabeledPolygon')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.AttributeSpec')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LabeledPolyline',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frame', models.PositiveIntegerField()),
                ('occluded', models.BooleanField(default=False)),
                ('points', models.TextField()),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Job')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Label')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LabeledPolylineAttributeVal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=64)),
                ('polyline', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.LabeledPolyline')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.AttributeSpec')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrackedPoints',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occluded', models.BooleanField(default=False)),
                ('points', models.TextField()),
                ('frame', models.PositiveIntegerField()),
                ('outside', models.BooleanField(default=False)),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.ObjectPath')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrackedPointsAttributeVal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=64)),
                ('points', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.TrackedPoints')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.AttributeSpec')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrackedPolygon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occluded', models.BooleanField(default=False)),
                ('points', models.TextField()),
                ('frame', models.PositiveIntegerField()),
                ('outside', models.BooleanField(default=False)),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.ObjectPath')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrackedPolygonAttributeVal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=64)),
                ('polygon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.TrackedPolygon')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.AttributeSpec')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrackedPolyline',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('occluded', models.BooleanField(default=False)),
                ('points', models.TextField()),
                ('frame', models.PositiveIntegerField()),
                ('outside', models.BooleanField(default=False)),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.ObjectPath')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TrackedPolylineAttributeVal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=64)),
                ('polyline', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.TrackedPolyline')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.AttributeSpec')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]