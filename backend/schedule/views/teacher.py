from rest_framework import generics

from ..models import TeacherModel
from ..serializers import TeacherSerializer


class TeachersListView(generics.ListCreateAPIView):
    queryset = TeacherModel.objects.all()
    serializer_class = TeacherSerializer


class TeacherView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TeacherModel.objects.all()
    serializer_class = TeacherSerializer
