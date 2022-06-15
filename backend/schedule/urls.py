from rest_framework.routers import DefaultRouter

from .views.teacher import TeacherViewSet
from .views.room import RoomViewSet

router = DefaultRouter()
router.register("teachers", TeacherViewSet, basename="teacher")
router.register("rooms", RoomViewSet, basename="room")

urlpatterns = router.urls
