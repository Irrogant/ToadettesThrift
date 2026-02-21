from django.contrib import admin
from .models import Cart, CartItem


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = (
        "item_id",
        "title",
        "price",
        "owner",
        "image",
        "date_added",
        "last_modified",
    )


class CartAdmin(admin.ModelAdmin):
    fields = ("id", "owner", "last_modified")
    readonly_fields = ("id", "last_modified")

    list_display = ("owner", "last_modified")
    list_filter = ("last_modified",)

    inlines = [CartItemInline]


class CartItemAdmin(admin.ModelAdmin):
    readonly_fields = ("item_id", "cart", "title", "price",
                       "image", "owner", "last_modified")

    list_display = ("title", "last_modified")
    list_filter = ("last_modified",)


admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
