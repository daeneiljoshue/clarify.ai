import CLARIFYCore from 'clarify-core/src';
import _clarify from 'clarify-core/src/api';

import ObjectState from 'clarify-core/src/object-state';
import Webhook from 'clarify-core/src/webhook';
import MLModel from 'clarify-core/src/ml-model';
import CloudStorage from 'clarify-core/src/cloud-storage';
import { ModelProvider } from 'clarify-core/src/lambda-manager';
import {
  Label, Attribute,
} from 'clarify-core/src/labels';
import { SerializedAttribute, SerializedLabel, SerializedAPISchema } from 'clarify-core/src/server-response-types';
import { Job, Task } from 'clarify-core/src/session';
import Project from 'clarify-core/src/project';
import QualityReport, { QualitySummary } from 'clarify-core/src/quality-report';
import QualityConflict, { AnnotationConflict, ConflictSeverity } from 'clarify-core/src/quality-conflict';
import QualitySettings from 'clarify-core/src/quality-settings';
import { FramesMetaData, FrameData } from 'clarify-core/src/frames';
import { ServerError } from 'clarify-core/src/exceptions';
import {
  ShapeType, LabelType, ModelKind, ModelProviders,
  ModelReturnType, DimensionType, JobType,
  JobStage, JobState, RQStatus,
} from 'clarify-core/src/enums';
import { Storage, StorageData } from 'clarify-core/src/storage';
import Issue from 'clarify-core/src/issue';
import Comment from 'clarify-core/src/comment';
import User from 'clarify-core/src/user';
import Organization, { Membership, Invitation } from 'clarify-core/src/organization';
import AnnotationGuide from 'clarify-core/src/guide';
import AnalyticsReport, { AnalyticsEntryViewType, AnalyticsEntry } from 'clarify-core/src/analytics-report';
import { Dumper } from 'clarify-core/src/annotation-formats';
import { Event } from 'clarify-core/src/event';
import { APIWrapperEnterOptions } from 'clarify-core/src/plugins';
import BaseSingleFrameAction, { ActionParameterType } from 'clarify-core/src/annotations-actions';

const clarify: CLARIFYCore = _clarify;

clarify.config.backendAPI = '/api';
clarify.config.origin = window.location.origin;
// Set the TUS chunk size to 2 MB. A small value works better in case of a slow internet connection.
// A larger value may cause a server-side timeout errors in the current implementation.
clarify.config.uploadChunkSize = 2;
(globalThis as any).clarify = clarify;

function getCore(): typeof clarify {
  return clarify;
}

export {
  getCore,
  ObjectState,
  Label,
  Job,
  Task,
  Project,
  AnnotationGuide,
  Attribute,
  ShapeType,
  LabelType,
  Storage,
  Webhook,
  Issue,
  User,
  CloudStorage,
  Organization,
  Membership,
  Invitation,
  Comment,
  MLModel,
  ModelKind,
  ModelProviders,
  ModelReturnType,
  DimensionType,
  Dumper,
  JobType,
  JobStage,
  JobState,
  RQStatus,
  BaseSingleFrameAction,
  QualityReport,
  QualityConflict,
  QualitySettings,
  AnnotationConflict,
  ConflictSeverity,
  FramesMetaData,
  AnalyticsReport,
  AnalyticsEntry,
  AnalyticsEntryViewType,
  ServerError,
  Event,
  FrameData,
  ActionParameterType,
};

export type {
  SerializedAttribute,
  SerializedLabel,
  StorageData,
  ModelProvider,
  APIWrapperEnterOptions,
  QualitySummary,
  CLARIFYCore,
  SerializedAPISchema,
};
