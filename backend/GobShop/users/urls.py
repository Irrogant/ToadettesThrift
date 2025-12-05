from django.urls import path
from .views import UsernameLoginView, CreateAccountView, EditAccountView, CurrentUserView

urlpatterns = [
    path("login/", UsernameLoginView.as_view(), name="login"),
    path("signup/", CreateAccountView.as_view(), name="signup"),
    path("account/", EditAccountView.as_view(), name="account"),
    path("current_user/", CurrentUserView.as_view(), name="current_user"),
]