from django.contrib import admin
from .models import Item, SoldItem


class ItemAdmin(admin.ModelAdmin):
    readonly_fields = ("id", "last_modified", "date_created")

    list_display = ("title", "owner", "last_modified", "date_created")
    list_filter = ("owner", "last_modified", "date_created")


class SoldItemAdmin(admin.ModelAdmin):
    readonly_fields = ("id", "seller", "buyer", "price",
                       "image", "title", "sold_at")

    list_display = ("title", "seller", "buyer", "sold_at")
    list_filter = ("seller", "buyer", "sold_at",)


admin.site.register(Item, ItemAdmin)
admin.site.register(SoldItem, SoldItemAdmin)
