from rest_framework_nested.routers import DefaultRouter, NestedSimpleRouter

from .views.activity import ActivityViewSet
from .views.course import CourseViewSet
from .views.room import RoomViewSet
from .views.schedule import ScheduleViewSet
from .views.teacher import TeacherViewSet

router = DefaultRouter()
router.register("teachers", TeacherViewSet, basename="teacher")
router.register("rooms", RoomViewSet, basename="room")
router.register("activities", ActivityViewSet, basename="activity")
router.register("schedules", ScheduleViewSet, basename="schedule")

schedules_router = NestedSimpleRouter(router, "schedules", lookup="schedule")
schedules_router.register("courses", CourseViewSet, basename="schedule-course")

urlpatterns = []
urlpatterns += router.urls
urlpatterns += schedules_router.urls
