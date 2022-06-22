from rest_framework import mixins
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from ._mixins import PermissionsPolicyMixin
from ..models import CourseModel
from ..serializers import CreateUpdateCourseSerializer, GetCourseSerializer


class CourseViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    PermissionsPolicyMixin,
                    GenericViewSet):
    queryset = CourseModel.objects.all()
    # permission_classes = [permissions.IsAdminUser]

    def create(self, request, schedule_pk):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(schedule_id=schedule_pk)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return CourseModel.objects.filter(schedule=self.kwargs['schedule_pk'])

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return GetCourseSerializer
        else:
            return CreateUpdateCourseSerializer
