from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

# Abstract base class for data items
class DataItem(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        abstract = True

# Function to generate upload paths
def upload_to(instance, filename):
    return f"data/{instance.__class__.__name__.lower()}/{filename}"

# Model for images
class Image(DataItem):
    image_file = models.ImageField(upload_to=upload_to)
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    format = models.CharField(max_length=50)

    def __str__(self):
        return self.description or f"Image {self.id}"

# Model for videos
class Video(DataItem):
    video_file = models.FileField(upload_to=upload_to)
    duration = models.DurationField()
    resolution = models.CharField(max_length=50)

    def __str__(self):
        return self.description or f"Video {self.id}"

# Model for audio files
class Audio(DataItem):
    audio_file = models.FileField(upload_to=upload_to)
    duration = models.DurationField()
    sample_rate = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return self.description or f"Audio {self.id}"

# Model for text data
class Text(DataItem):
    text_content = models.TextField()

    def __str__(self):
        return self.description or f"Text {self.id}"

# Model for Lidar data
class Lidar(DataItem):
    lidar_file = models.FileField(upload_to=upload_to)
    num_points = models.PositiveIntegerField()

    def __str__(self):
        return self.description or f"Lidar {self.id}"

# Model for 3D point clouds
class PointCloud(DataItem):
    point_cloud_file = models.FileField(upload_to=upload_to)
    num_points = models.PositiveIntegerField()

    def __str__(self):
        return self.description or f"Point Cloud {self.id}"

# Abstract base class for annotations
class Annotation(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    annotator = models.ForeignKey(User, on_delete=models.CASCADE)
    confidence_level = models.FloatField(default=0.0)

    class Meta:
        abstract = True

# Annotation model for images
class ImageAnnotation(Annotation):
    image = models.ForeignKey(Image, related_name='annotations', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    version = models.PositiveIntegerField(default=1)
    metadata = models.JSONField(default=dict)

# Annotation model for videos
class VideoAnnotation(Annotation):
    video = models.ForeignKey(Video, related_name='annotations', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    version = models.PositiveIntegerField(default=1)
    metadata = models.JSONField(default=dict)

# Annotation model for audio
class AudioAnnotation(Annotation):
    audio = models.ForeignKey(Audio, related_name='annotations', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    version = models.PositiveIntegerField(default=1)
    metadata = models.JSONField(default=dict)

# Annotation model for text
class TextAnnotation(Annotation):
    text = models.ForeignKey(Text, related_name='annotations', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    version = models.PositiveIntegerField(default=1)
    metadata = models.JSONField(default=dict)

# Annotation model for Lidar
class LidarAnnotation(Annotation):
    lidar = models.ForeignKey(Lidar, related_name='annotations', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    version = models.PositiveIntegerField(default=1)
    metadata = models.JSONField(default=dict)

# Annotation model for point clouds
class PointCloudAnnotation(Annotation):
    point_cloud = models.ForeignKey(PointCloud, related_name='annotations', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    version = models.PositiveIntegerField(default=1)
    metadata = models.JSONField(default=dict)
