from rest_framework import mixins
from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet
from rest_framework_bulk import mixins as bulk_mixins

from ._mixins import PermissionsPolicyMixin
from ..models import ScheduleModel
from ..serializers import ScheduleSerializer


class ScheduleViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      bulk_mixins.BulkCreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      PermissionsPolicyMixin,
                      GenericViewSet):
    queryset = ScheduleModel.objects.all()
    serializer_class = ScheduleSerializer
    # permission_classes = [permissions.IsAdminUser]
