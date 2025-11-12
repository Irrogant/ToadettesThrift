from django.urls import path
from .views import landing, ItemsView

urlpatterns = [
    path("", landing, name="landing"),
    path("myitems/", ItemsView.as_view(), name="myitems"),
]