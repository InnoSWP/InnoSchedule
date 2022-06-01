from django.urls import path, include

from . import views

urlpatterns = [
    path("teachers/", views.TeachersListView.as_view()),
    path("teachers/<pk>", views.TeacherView.as_view()),
]
