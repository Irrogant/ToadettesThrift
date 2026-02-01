from django.urls import path
from .views import CartView, CheckOutView

urlpatterns = [
    path("cart/", CartView.as_view(), name="cart"),
    path("checkout/", CheckOutView.as_view(), name="checkout")
]
