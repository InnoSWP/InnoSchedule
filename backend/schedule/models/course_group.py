import uuid

from django.db import models

from .teacher import TeacherModel
from .course import CourseModel


class CourseGroupModel(models.Model):
    course = models.ForeignKey(CourseModel, on_delete=models.CASCADE, related_name="course_groups", null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256, blank=True)
    teachers = models.ManyToManyField(TeacherModel)

    def __str__(self):
        return self.name
