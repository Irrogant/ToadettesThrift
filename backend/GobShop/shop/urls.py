from django.urls import path
from .views import landing, ItemsView, CreateItemView, AllItemsView

urlpatterns = [
    path("land", landing, name="landing"),
    path("", AllItemsView.as_view(), name="allitems"),
    path("myitems/", ItemsView.as_view(), name="myitems"),
    path("createitem/", CreateItemView.as_view(), name="createitem"),
]