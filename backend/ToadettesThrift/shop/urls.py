from django.urls import path
from .views import LandingView, ItemsView, CreateItemView, AllItemsView, SearchItemsView, ItemDetail

urlpatterns = [
    path("landing/", LandingView.as_view(), name="landing"),
    path("allitems/", AllItemsView.as_view(), name="allitems"),
    path("myitems/", ItemsView.as_view(), name="myitems"),
    path("createitem/", CreateItemView.as_view(), name="createitem"),
    path("searchitems/", SearchItemsView.as_view(), name="searchitems"),
    path("itemdetail/", ItemDetail.as_view(), name="itemdetail")
]
