

import textwrap

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, OpenApiResponse, extend_schema
from rest_framework import status, viewsets
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.response import Response

from clarify.apps.analytics_report.models import AnalyticsReport
from clarify.apps.analytics_report.report.create import AnalyticsReportUpdateManager
from clarify.apps.analytics_report.report.get import get_analytics_report
from clarify.apps.analytics_report.serializers import (
    AnalyticsReportCreateSerializer,
    AnalyticsReportSerializer,
)
from clarify.apps.engine.models import Job, Project, Task
from clarify.apps.engine.serializers import RqIdSerializer


class AnalyticsReportViewSet(viewsets.ViewSet):
    serializer_class = None

    def get_queryset(self):
        return AnalyticsReport.objects

    @extend_schema(
        operation_id="analytics_create_report",
        summary="Creates a analytics report asynchronously and allows to check request status",
        parameters=[
            OpenApiParameter(
                "rq_id",
                type=str,
                description=textwrap.dedent(
                    """\
                    The report creation request id. Can be specified to check the report
                    creation status.
                """
                ),
            ),
        ],
        request=AnalyticsReportCreateSerializer(),
        responses={
            "201": OpenApiResponse(
                description="A analytics report request has been computed",
            ),
            "202": OpenApiResponse(
                RqIdSerializer,
                description=textwrap.dedent(
                    """\
                    A analytics report request has been enqueued, the request id is returned.
                    The request status can be checked at this endpoint by passing the {}
                    as the query parameter. If the request id is specified, this response
                    means the analytics report request is queued or is being processed.
                """.format(
                        "rq_id"
                    )
                ),
            ),
            "400": OpenApiResponse(
                description="Invalid or failed request, check the response data for details"
            ),
        },
    )
    def create(self, request, *args, **kwargs):
        rq_id = request.query_params.get("rq_id", None)

        if rq_id is None:
            input_serializer = AnalyticsReportCreateSerializer(data=request.data)
            input_serializer.is_valid(raise_exception=True)

            job_id = input_serializer.validated_data.get("job_id")
            task_id = input_serializer.validated_data.get("task_id")
            project_id = input_serializer.validated_data.get("project_id")

            if job_id is not None:
                try:
                    job = Job.objects.get(pk=int(job_id))
                except Job.DoesNotExist as ex:
                    raise NotFound(f"Job {job_id} does not exist") from ex

                try:
                    rq_id = AnalyticsReportUpdateManager().schedule_analytics_check_job(
                        job=job, user_id=request.user.id
                    )
                    serializer = RqIdSerializer({"rq_id": rq_id})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                except AnalyticsReportUpdateManager.AnalyticsReportsNotAvailable as ex:
                    raise ValidationError(str(ex))
            elif task_id is not None:
                try:
                    task = Task.objects.get(pk=int(task_id))
                except Task.DoesNotExist as ex:
                    raise NotFound(f"Task {task_id} does not exist") from ex

                try:
                    rq_id = AnalyticsReportUpdateManager().schedule_analytics_check_job(
                        task=task, user_id=request.user.id
                    )
                    serializer = RqIdSerializer({"rq_id": rq_id})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                except AnalyticsReportUpdateManager.AnalyticsReportsNotAvailable as ex:
                    raise ValidationError(str(ex))
            elif project_id is not None:
                try:
                    project = Project.objects.get(pk=int(project_id))
                except Project.DoesNotExist as ex:
                    raise NotFound(f"Project {project_id} does not exist") from ex
                try:
                    rq_id = AnalyticsReportUpdateManager().schedule_analytics_check_job(
                        project=project, user_id=request.user.id
                    )
                    serializer = RqIdSerializer({"rq_id": rq_id})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                except AnalyticsReportUpdateManager.AnalyticsReportsNotAvailable as ex:
                    raise ValidationError(str(ex))
        else:
            serializer = RqIdSerializer(data={"rq_id": rq_id})
            serializer.is_valid(raise_exception=True)
            rq_id = serializer.validated_data["rq_id"]

            report_manager = AnalyticsReportUpdateManager()
            rq_job = report_manager.get_analytics_check_job(rq_id)

            if rq_job is None:
                raise NotFound("Unknown request id")

            if rq_job.is_failed:
                message = str(rq_job.exc_info)
                rq_job.delete()
                raise ValidationError(message)
            elif rq_job.is_queued or rq_job.is_started:
                return Response(status=status.HTTP_202_ACCEPTED)
            elif rq_job.is_finished:
                return_value = rq_job.return_value()
                rq_job.delete()
                if not return_value:
                    raise ValidationError("No report has been computed")

                serializer = RqIdSerializer({"rq_id": rq_id})
                return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        summary="Method returns analytics report",
        methods=["GET"],
        operation_id="analytics_get_reports",
        description="Receive analytics report",
        parameters=[
            OpenApiParameter(
                "project_id",
                location=OpenApiParameter.QUERY,
                type=OpenApiTypes.INT,
                required=False,
                description="Specify project ID",
            ),
            OpenApiParameter(
                "task_id",
                location=OpenApiParameter.QUERY,
                type=OpenApiTypes.INT,
                required=False,
                description="Specify task ID",
            ),
            OpenApiParameter(
                "job_id",
                location=OpenApiParameter.QUERY,
                type=OpenApiTypes.INT,
                required=False,
                description="Specify job ID",
            ),
            OpenApiParameter(
                "start_date",
                location=OpenApiParameter.QUERY,
                type=OpenApiTypes.DATETIME,
                required=False,
                description="Specify a start date for filtering report data.",
            ),
            OpenApiParameter(
                "end_date",
                location=OpenApiParameter.QUERY,
                type=OpenApiTypes.DATETIME,
                required=False,
                description="Specify the end date for filtering report data.",
            ),
        ],
        responses={
            "200": AnalyticsReportSerializer,
            "404": OpenApiResponse(description="Not found"),
        },
    )
    def list(self, request):
        return get_analytics_report(
            request=request,
            query_params=request.query_params,
        )