from django.db import models
from shop.models import Item
from django.conf import settings 

class Cart(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    update_date = models.DateField(auto_now_add=True)
    locked = models.BooleanField(default=False)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    item_id = models.PositiveIntegerField(null=True)
    title = models.CharField(max_length=20, blank=False, default="")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    date_added = models.DateField(auto_now_add=True)

    # def __str__(self):
    #     return self.title