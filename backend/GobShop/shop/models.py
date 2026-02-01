from django.db import models
from django.utils.translation import gettext as _
from django.conf import settings
from django.core.exceptions import ValidationError
from django.conf import settings


class Item(models.Model):
    title = models.CharField(max_length=20, blank=False, null=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    description = models.CharField(max_length=200, default="", null=False)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    image = models.FileField(
        upload_to="items", null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return None


class SoldItem(models.Model):
    title = models.CharField(max_length=20, blank=False, null=False)
    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="sold_items")
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="purchased_items")
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    sold_at = models.DateField(auto_now_add=True)
    image = models.FileField(
        upload_to="items", null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return None

    def save(self, *args, **kwargs):
        if self.pk:
            raise ValidationError(
                "you shall NOT edit an existing %s" % self._meta.model_name)
        super(SoldItem, self).save(*args, **kwargs)
