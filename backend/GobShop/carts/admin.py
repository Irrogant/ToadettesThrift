from django.contrib import admin
from .models import Cart, CartItem

# TODO: också visa datum i adview
admin.site.register(Cart)
admin.site.register(CartItem)