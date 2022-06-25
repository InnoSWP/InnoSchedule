from django.test import TestCase, Client
from ..models import ActivityModel, TeacherModel
from ..serializers import ActivitySerializer
from rest_framework import status
import json


client = Client()
api_pre_path = "/api/v1"


class ActivityTest(TestCase):
    def setUp(self):
        ActivityModel.objects.create(name="Lab")
        ActivityModel.objects.create(name="Lecture")
        ActivityModel.objects.create(name="TestActivity")

    def test_get_all_activities(self):
        response = client.get(api_pre_path + "/activities/")

        activities = ActivityModel.objects.all()
        serializer = ActivitySerializer(activities, many=True)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_activity(self):
        activity = ActivityModel.objects.get(name="TestActivity")

        response = client.get(api_pre_path + f"/activities/{activity.id}/")
        serializer = ActivitySerializer(activity)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        valid_payload = {"name": "Tutorial"}
        response = client.post(
            api_pre_path + "/activities/",
            data=json.dumps(valid_payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_activity(self):
        valid_payload = {"name": "Lab NEW"}
        lab = ActivityModel.objects.get(name="Lab")
        response = client.put(
            api_pre_path + f"/activities/{lab.id}/",
            data=json.dumps(valid_payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_activity(self):
        lecture = ActivityModel.objects.get(name="Lecture")
        response = client.delete(
            api_pre_path + f"/activities/{lecture.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TeacherTest(TestCase):
    def setUp(self):
        TeacherModel.objects.create(name="Moofiy")
        TeacherModel.objects.create(name="Rabab")
        TeacherModel.objects.create(name="TestTeacher")

    def test_get_all_activities(self):
        response = client.get(api_pre_path + "/activities/")

        teachers = ActivityModel.objects.all()
        serializer = ActivitySerializer(teachers, many=True)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_activity(self):
        teacher = TeacherModel.objects.get(name="TestTeacher")

        response = client.get(api_pre_path + f"/teachers/{teacher.id}/")
        serializer = ActivitySerializer(teacher)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        valid_payload = {"name": "Teacher1"}
        response = client.post(
            api_pre_path + "/teachers/",
            data=json.dumps(valid_payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_activity(self):
        valid_payload = {"name": "Teacher NEW"}
        lab = TeacherModel.objects.get(name="Moofiy")
        response = client.put(
            api_pre_path + f"/teachers/{lab.id}/",
            data=json.dumps(valid_payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_activity(self):
        lecture = TeacherModel.objects.get(name="Rabab")
        response = client.delete(
            api_pre_path + f"/teachers/{lecture.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
