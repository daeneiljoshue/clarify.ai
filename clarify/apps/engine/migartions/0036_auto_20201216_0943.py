
# Generated by Django 3.1.1 on 2020-12-16 09:43

import clarify.apps.engine.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0035_data_storage'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='dimension',
            field=models.CharField(choices=[('3d', 'DIM_3D'), ('2d', 'DIM_2D')], default=clarify.apps.engine.models.DimensionType['DIM_2D'], max_length=2),
        ),
        migrations.CreateModel(
            name='RelatedFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.FileField(max_length=1024, storage=clarify.apps.engine.models.MyFileSystemStorage(), upload_to=clarify.apps.engine.models.upload_path_handler)),
                ('data', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_files', to='engine.data')),
                ('primary_image', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_files', to='engine.image')),
            ],
            options={
                'default_permissions': (),
                'unique_together': {('data', 'path')},
            },
        ),
    ]