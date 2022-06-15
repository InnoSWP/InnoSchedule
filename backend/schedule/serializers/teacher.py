from rest_framework.serializers import ModelSerializer
from rest_framework_bulk import BulkSerializerMixin, BulkListSerializer

from ..models import TeacherModel


class TeacherSerializer(BulkSerializerMixin, ModelSerializer):
    class Meta:
        model = TeacherModel
        list_serializer_class = BulkListSerializer
        update_lookup_field = "id"
        fields = "__all__"
