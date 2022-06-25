from rest_framework.serializers import ModelSerializer

from .course_group import GetCourseGroupSerializer, CreateUpdateCourseGroupSerializer
from ..models import CourseModel, CourseGroupModel


class CreateUpdateCourseSerializer(ModelSerializer):
    course_groups = CreateUpdateCourseGroupSerializer(many=True, required=False)

    def create(self, validated_data, *args, **kwargs):
        course_groups_data = validated_data.pop('course_groups')
        course_instance = CourseModel.objects.create(**validated_data)
        for course_group_data in course_groups_data:
            course_group_teachers = course_group_data.pop("teachers")
            course_group = CourseGroupModel.objects.create(course=course_instance, **course_group_data)
            course_group.teachers.add(*course_group_teachers)
        return course_instance

    class Meta:
        model = CourseModel
        fields = ("id", "name", "has_division", "course_groups")


class GetCourseSerializer(ModelSerializer):
    course_groups = GetCourseGroupSerializer(many=True, required=False)

    class Meta:
        model = CourseModel
        fields = ("id", "name", "has_division", "course_groups")
