import uuid

from django.db import models

from .schedule import ScheduleModel


class CourseModel(models.Model):
    schedule = models.ForeignKey(ScheduleModel, on_delete=models.CASCADE, related_name="courses")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256)
    has_division = models.BooleanField(default=False)

    def __str__(self):
        return self.name
