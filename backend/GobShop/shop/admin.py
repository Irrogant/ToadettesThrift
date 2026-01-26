from django.contrib import admin
from .models import Item, SoldItem

# TODO: också visa datum i adview
admin.site.register(Item)
admin.site.register(SoldItem)
