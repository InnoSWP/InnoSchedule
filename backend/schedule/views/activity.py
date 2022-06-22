from rest_framework import mixins
from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet
from rest_framework_bulk import mixins as bulk_mixins

from ._mixins import PermissionsPolicyMixin
from ..models import ActivityModel
from ..serializers import ActivitySerializer


class ActivityViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      bulk_mixins.BulkCreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      PermissionsPolicyMixin,
                      GenericViewSet):
    queryset = ActivityModel.objects.all()
    serializer_class = ActivitySerializer
    # permission_classes = [permissions.IsAdminUser]
