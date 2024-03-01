
from django.conf import settings
from django.db import migrations, models
import django.db.migrations.operations.special
import django.db.models.deletion
import clarify.apps.engine.models

def set_segment_size(apps, schema_editor):
    Task = apps.get_model('engine', 'Task')
    for task in Task.objects.all():
        segment = task.segment_set.first()
        if segment:
            task.segment_size = segment.stop_frame - segment.start_frame + 1
            task.save()

class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('engine', '0014_job_max_shape_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='segment_size',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.RunPython(
            code=set_segment_size,
            reverse_code=django.db.migrations.operations.special.RunPython.noop,
        ),
        migrations.AlterField(
            model_name='task',
            name='segment_size',
            field=models.PositiveIntegerField(),
        ),
        migrations.CreateModel(
            name='ClientFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(max_length=1024, storage=clarify.apps.engine.models.MyFileSystemStorage(),
                    upload_to=clarify.apps.engine.models.upload_path_handler)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Task')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='RemoteFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.CharField(max_length=1024)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Task')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='ServerFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.CharField(max_length=1024)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Task')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('ANNOTATION', 'annotation'), ('VALIDATION', 'validation'), ('COMPLETED', 'completed')], default='annotation', max_length=32),
        ),
        migrations.AlterField(
            model_name='task',
            name='overlap',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.RemoveField(
            model_name='task',
            name='path',
        ),
        migrations.AddField(
            model_name='task',
            name='image_quality',
            field=models.PositiveSmallIntegerField(default=50),
        ),
        migrations.CreateModel(
            name='Plugin',
            fields=[
                ('name', models.SlugField(max_length=32, primary_key=True, serialize=False)),
                ('description', clarify.apps.engine.models.SafeCharField(max_length=8192)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('maintainer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='maintainers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='PluginOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', clarify.apps.engine.models.SafeCharField(max_length=32)),
                ('value', clarify.apps.engine.models.SafeCharField(max_length=1024)),
                ('plugin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Plugin')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='label',
            unique_together={('task', 'name')},
        ),
        migrations.AlterUniqueTogether(
            name='clientfile',
            unique_together={('task', 'file')},
        ),
        migrations.AddField(
            model_name='attributespec',
            name='default_value',
            field=models.CharField(default='', max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='attributespec',
            name='input_type',
            field=models.CharField(choices=[('CHECKBOX', 'checkbox'), ('RADIO', 'radio'), ('NUMBER', 'number'), ('TEXT', 'text'), ('SELECT', 'select')], default='select', max_length=16),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='attributespec',
            name='mutable',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='attributespec',
            name='name',
            field=models.CharField(default='test', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='attributespec',
            name='values',
            field=models.CharField(default='', max_length=4096),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='job',
            name='status',
            field=models.CharField(choices=[('ANNOTATION', 'annotation'), ('VALIDATION', 'validation'), ('COMPLETED', 'completed')], default='annotation', max_length=32),
        ),
        migrations.AlterField(
            model_name='attributespec',
            name='text',
            field=models.CharField(default='', max_length=1024),
        ),
        migrations.AlterField(
            model_name='attributespec',
            name='input_type',
            field=models.CharField(choices=[('checkbox', 'CHECKBOX'), ('radio', 'RADIO'), ('number', 'NUMBER'), ('text', 'TEXT'), ('select', 'SELECT')], max_length=16),
        ),
        migrations.AlterField(
            model_name='task',
            name='segment_size',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='job',
            name='status',
            field=models.CharField(choices=[('annotation', 'ANNOTATION'), ('validation', 'VALIDATION'), ('completed', 'COMPLETED')], default='annotation', max_length=32),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('annotation', 'ANNOTATION'), ('validation', 'VALIDATION'), ('completed', 'COMPLETED')], default='annotation', max_length=32),
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=1024)),
                ('frame', models.PositiveIntegerField()),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.Task')),
                ('height', models.PositiveIntegerField()),
                ('width', models.PositiveIntegerField()),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=1024)),
                ('start_frame', models.PositiveIntegerField()),
                ('stop_frame', models.PositiveIntegerField()),
                ('step', models.PositiveIntegerField(default=1)),
                ('task', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='engine.Task')),
                ('height', models.PositiveIntegerField()),
                ('width', models.PositiveIntegerField()),
            ],
            options={
                'default_permissions': (),
            },
        ),
    ]