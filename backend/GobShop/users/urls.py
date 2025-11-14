from django.urls import path
from .views import UsernameLoginView, CreateAccountView, EditAccountView

urlpatterns = [
    path("login/", UsernameLoginView.as_view(), name="login"),
    path("signup/", CreateAccountView.as_view(), name="signup"),
    path("account/", EditAccountView.as_view(), name="account"),
]