


{{/*
Expand the name of the chart.
*/}}
{{- define "clarify.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "clarify.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "clarify.chart" -}}
{{- printf "%s" .Chart.Name | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "clarify.labels" -}}
helm.sh/chart: {{ include "cvat.chart" . }}
{{ include "clarify.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "clarify.selectorLabels" -}}
app.kubernetes.io/name: {{ include "clarify.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "clarify.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "clarify.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{- define "clarify.sharedBackendEnv" }}
{{- if .Values.redis.enabled }}
- name: CLARIFY_REDIS_INMEM_HOST
  value: "{{ .Release.Name }}-redis-master"
{{- else }}
- name: CLARIFY_REDIS_INMEM_HOST
  value: "{{ .Values.redis.external.host }}"
{{- end }}
- name: CLARIFY_REDIS_INMEM_PORT
  value: "6379"
- name: CLARIFY_REDIS_INMEM_PASSWORD
  valueFrom:
    secretKeyRef:
      name: "{{ tpl (.Values.redis.secret.name) . }}"
      key: password

{{- if .Values.cvat.kvrocks.enabled }}
- name: CLARIFY_REDIS_ONDISK_HOST
  value: "{{ .Release.Name }}-kvrocks"
{{- else }}
- name: CLARIFY_REDIS_ONDISK_HOST
  value: "{{ .Values.cvat.kvrocks.external.host }}"
{{- end }}
- name: CLARIFY_REDIS_ONDISK_PORT
  value: "6666"
- name: CLARIFY_REDIS_ONDISK_PASSWORD
  valueFrom:
    secretKeyRef:
      name: "{{ tpl (.Values.cvat.kvrocks.secret.name) . }}"
      key: password

{{- if .Values.postgresql.enabled }}
- name: CLARIFY_POSTGRES_HOST
  value: "{{ .Release.Name }}-postgresql"
- name: CLARIFY_POSTGRES_PORT
  value: "{{ .Values.postgresql.service.ports.postgresql }}"
{{- else }}
- name: CLARIFY_POSTGRES_HOST
  value: "{{ .Values.postgresql.external.host }}"
- name: CLARIFY_POSTGRES_PORT
  value: "{{ .Values.postgresql.external.port }}"
{{- end }}
- name: CLARIFY_POSTGRES_USER
  valueFrom:
    secretKeyRef:
      name: "{{ tpl (.Values.postgresql.secret.name) . }}"
      key: username
- name: CLARIFY_POSTGRES_DBNAME
  valueFrom:
    secretKeyRef:
      name: "{{ tpl (.Values.postgresql.secret.name) . }}"
      key: database
- name: CLARIFY_POSTGRES_PASSWORD
  valueFrom:
    secretKeyRef:
      name: "{{ tpl (.Values.postgresql.secret.name) . }}"
      key: password

{{- if .Values.analytics.enabled}}
- name: CLARIFY_ANALYTICS
  value: "1"
- name: DJANGO_LOG_SERVER_HOST
  value: "{{ .Release.Name }}-vector"
- name: DJANGO_LOG_SERVER_PORT
  value: "80"
- name: CLICKHOUSE_HOST
  value: "{{ .Release.Name }}-clickhouse"
{{- end }}

- name: SMOKESCREEN_OPTS
  value: {{ .Values.smokescreen.opts | toJson }}
{{- if .Values.nuclio.enabled }}
- name: CLARIFY_SERVERLESS
  value: "1"
- name: CLARIFY_NUCLIO_HOST
  value: "{{ .Release.Name }}-nuclio-dashboard"
- name: CLARIFY_NUCLIO_FUNCTION_NAMESPACE
  value: "{{ .Release.Namespace }}"
{{- end }}
{{- end }}