from rest_framework.serializers import ModelSerializer

from ..models import ScheduleModel


class ScheduleSerializer(ModelSerializer):
    class Meta:
        model = ScheduleModel
        fields = ("id", "name")
