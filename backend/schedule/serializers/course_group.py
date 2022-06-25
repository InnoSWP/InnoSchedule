from rest_framework.serializers import ModelSerializer
from rest_framework_bulk import BulkSerializerMixin, BulkListSerializer

from . import TeacherSerializer
from ..models import CourseGroupModel


class GetCourseGroupSerializer(ModelSerializer):
    teachers = TeacherSerializer(read_only=True, many=True)

    class Meta:
        model = CourseGroupModel
        fields = ("id", "name", "teachers")


class CreateUpdateCourseGroupSerializer(BulkSerializerMixin, ModelSerializer):
    class Meta:
        model = CourseGroupModel
        list_serializer_class = BulkListSerializer
        update_lookup_field = "id"
        fields = ("id", "name", "teachers")
