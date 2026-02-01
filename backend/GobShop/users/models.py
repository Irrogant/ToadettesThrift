from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext as _


class UserManager(BaseUserManager):

    # Used to create basic users
    def create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError(_("User must have username"))
        if not email:
            raise ValueError(_("User must have email"))
        if not password:
            raise ValueError(_("User must have password"))
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    # Used to create admin users
    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault("superuser", True)
        extra_fields.setdefault("staff", True)
        extra_fields.setdefault("active", True)

        if extra_fields.get("staff") is not True:
            raise ValueError(_("Superuser must have staff=True"))
        if extra_fields.get("superuser") is not True:
            raise ValueError(_("Superuser must have superuser=True"))
        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):

    # An ID field is generated automatically by Django
    username = models.CharField(
        max_length=20, unique=True, blank=False, null=False)
    email = models.EmailField(
        max_length=254, unique=True, blank=False, null=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    superuser = models.BooleanField(default=False)
    staff = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = "username"
    # USERNAME_FIELD and password are required by default
    REQUIRED_FIELDS = ["email"]

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_superuser(self):
        return self.superuser

    @property
    def is_active(self):
        return self.active

    def __str__(self):
        return self.username
