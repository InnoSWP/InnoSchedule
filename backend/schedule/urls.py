from rest_framework.routers import DefaultRouter

from .views.teacher import TeacherViewSet
from .views.room import RoomViewSet
from .views.activity import ActivityViewSet

router = DefaultRouter()
router.register("teachers", TeacherViewSet, basename="teacher")
router.register("rooms", RoomViewSet, basename="room")
router.register("activities", ActivityViewSet, basename="activity")

urlpatterns = router.urls
