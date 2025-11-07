from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserCreateForm, UserEditForm
from .models import User

class UserAdmin(BaseUserAdmin):
    model = User

    # Customizing admin view
    list_display = ('username', 'email')
    list_filter = ('superuser', 'active',)
    ordering = ('email',)
    readonly_fields = ('date_joined','last_login') # Fields that should not be editable

    # Fields visible in creation form
    add_form = UserCreateForm
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 
                       'email',
                       'password',
                       'balance',
                       'active',
                       'superuser',
                       'staff',
                       )
        }),
    )

    # Fields visible in editing form
    form = UserEditForm
    fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 
                       'email', 
                       'balance', 
                       'active', 
                       'superuser',
                       'staff',
                       'date_joined',
                       'last_login',
                       )
        }),
    )

admin.site.register(User, UserAdmin)