from django.db import models
from django.utils.translation import gettext as _
from django.conf import settings

class Item(models.Model):
    title = models.CharField(max_length=20, blank=False, null=False)
    amount = models.IntegerField(blank=False, null=False, default=1)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, blank=True, null=False) # Optional field when creating items
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    date_added = models.DateField(auto_now_add=True) # Adds current date at creation
    
    # The item status can be one of three options
    STATUS = (
        ("SA", "For sale"),
        ("SO", "Sold"),
        ("PU", "Purchased")
    )

    status = models.CharField(max_length=2, choices=STATUS, default="SA")

    def __str__(self):
        return self.title