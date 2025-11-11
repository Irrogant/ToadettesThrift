from django.urls import path
from .views import UsernameLoginView

urlpatterns = [
    path("login/", UsernameLoginView.as_view(), name="login"),
]