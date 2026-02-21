from django import forms
from .models import User

class UserCreateForm(forms.ModelForm):
    
    class Meta:
        model = User
        fields = [
            "username",
            "email",
        ]
        widgets = {
            "password": forms.PasswordInput(),
        }

class UserEditForm(forms.ModelForm):

    class Meta:
        model = User
        fields = [
            "username",
            "email",
        ]