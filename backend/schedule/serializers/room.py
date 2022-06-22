from rest_framework.serializers import ModelSerializer
from rest_framework_bulk import BulkSerializerMixin, BulkListSerializer

from ..models import RoomModel


class RoomSerializer(BulkSerializerMixin, ModelSerializer):
    class Meta:
        model = RoomModel
        list_serializer_class = BulkListSerializer
        update_lookup_field = "id"
        fields = ("id", "name")
