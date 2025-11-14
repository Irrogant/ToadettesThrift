from django.urls import path
from .views import landing, ItemsView, CreateItemView

urlpatterns = [
    path("", landing, name="landing"),
    path("myitems/", ItemsView.as_view(), name="myitems"),
    path("createitem/", CreateItemView.as_view(), name="createitem"),
]