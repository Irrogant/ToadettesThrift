from django.shortcuts import render
from rest_framework.views import APIView
from carts.models import Cart, CartItem
from shop.models import Item
from rest_framework.response import Response

# TODO: make sure only cart owner can see and modify own cart
class CartView(APIView):
    #TODO: serializer?
    def get(self, request, *args, **kwargs):
        print("GHEEEEETTT")
        cart, created = Cart.objects.get_or_create(owner=request.user)
        cart_items = CartItem.objects.filter(cart=cart)
        print(cart_items)
        return Response({"cart_items": [
            {
                "id": cart_item.item.id,
                "title": cart_item.item.title,
                "description": cart_item.item.description,
                "price": str(cart_item.item.price),
                "date_added": cart_item.item.date_added,
                "status": cart_item.item.status,
            } for cart_item in cart_items
        ]})

    # TODO: add price
    def post(self, request, *args, **kwargs):
        # add
        if request.data.get("action") == "add":
            item_id = request.data.get("item_id")
            item = Item.objects.get(id=item_id)
            cart, created = Cart.objects.get_or_create(owner=request.user)

            # trying to add already existing item
            if CartItem.objects.filter(item=item, cart=cart).exists():
                return Response({"error": "Item is already in cart."}, status=400)
            
            cart_item = CartItem.objects.create(cart=cart, item=item)
            cart_item.save() 
            return Response({"success": True, "cart_item_id": cart_item.id})

        # remove
        if request.data.get("action") == "remove":
            cart_item_id = request.data.get("cart_item_id")
            cart_item = CartItem.objects.get(id=cart_item_id)
            cart_item.delete()
            return Response({"success": True, "cart_item_id": cart_item.id})

# class CheckOutView(APIView):

#     def post():
#         # post = buy
#         # jämför cart items w real items 
#         # om samma, genomför köp
#         # = clear cart, ändra items ti sold, gör cart items ti purchased? 