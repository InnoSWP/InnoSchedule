import uuid

from django.db import models


class TeacherModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256, unique=True)

    def __str__(self):
        return self.name
