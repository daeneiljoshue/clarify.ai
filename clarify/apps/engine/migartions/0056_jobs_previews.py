
# Generated by Django 3.2.14 on 2022-07-18 06:37

import os
import shutil
from django.db import migrations
from django.conf import settings
from clarify.apps.engine.log import get_logger

MIGRATION_NAME = os.path.splitext(os.path.basename(__file__))[0]
MIGRATION_LOG = os.path.join(settings.MIGRATIONS_LOGS_ROOT, f"{MIGRATION_NAME}.log")

def _get_query_set(apps):
    Job = apps.get_model("engine", "Job")
    query_set = Job.objects.all()
    return query_set

def _get_job_preview_path(jid):
    return os.path.join(settings.JOBS_ROOT, str(jid), "preview.jpeg")

def _get_data_preview_path(did):
    return os.path.join(settings.MEDIA_DATA_ROOT, str(did), "preview.jpeg")

def create_previews(apps, schema_editor):
    logger = get_logger(MIGRATION_NAME, MIGRATION_LOG)
    query_set = _get_query_set(apps)
    logger.info(f'Migration has been started. Need to create {query_set.count()} previews.')
    for db_job in query_set:
        try:
            jid = db_job.id
            did = db_job.segment.task.data.id
            task_preview = _get_data_preview_path(did)
            job_preview =  _get_job_preview_path(jid)
            if os.path.isfile(task_preview) and not os.path.isfile(job_preview):
                shutil.copy(task_preview, job_preview)
        except Exception as e:
            logger.error(f'Cannot create preview for job {db_job.id}')
            logger.error(str(e))

def delete_previews(apps, schema_editor):
    logger = get_logger(MIGRATION_NAME, MIGRATION_LOG)
    query_set = _get_query_set(apps)
    logger.info(f'Reverse migration has been started. Need to delete {query_set.count()} previews.')
    for db_job in query_set:
        try:
            jid = db_job.id
            job_preview =  _get_job_preview_path(jid)
            if os.path.isfile(job_preview):
                os.remove(job_preview)
        except Exception as e:
            logger.error(f'Cannot delete preview for job {db_job.id}')
            logger.error(str(e))

class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0055_jobs_directories'),
    ]

    operations = [
        migrations.RunPython(
            code=create_previews,
            reverse_code=delete_previews
        )
    ]