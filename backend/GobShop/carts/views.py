from django.shortcuts import render
from rest_framework.views import APIView
from carts.models import Cart, CartItem
from shop.models import Item, SoldItem
from rest_framework.response import Response
from django.db import transaction
from rest_framework.permissions import IsAuthenticated

# TODO: clean input values
# TODO: make sure only cart owner can see and modify own cart
# curl -X POST "http://localhost:7000/cart/" -H "Content-Type: application/json" -H "Cookie: sessionid=mhnff9ml9eqfrn3f0ggjebuqnbk2hub6; csrftoken=RdLZOL6VsOtfKCM3NhzELnW6Qd4O1kSu" -H "X-CSRFToken: RdLZOL6VsOtfKCM3NhzELnW6Qd4O1kSu" -d '{"cart_item_id":1,"action":"remove"}'

class CartView(APIView):
    permission_classes = [IsAuthenticated]
    #TODO: serializer?

    def get(self, request, *args, **kwargs):

        print("GHEEEEETTT")
        print(request.path)
        cart, created = Cart.objects.get_or_create(owner=request.user)
        cart_items = cart.items.all()
        print(cart_items)
        return Response({"items": [
            {
                "id": cart_item.item_id,
                "title": cart_item.title,
                "price": str(cart_item.price),
                "date_added": cart_item.date_added,
                "owner": cart_item.owner.username,
            } for cart_item in cart_items
        ]})
        return Response({"success": True})

    # TODO: add price
    # TODO: prevent user to add their own items to cart

    def post(self, request, *args, **kwargs):
        # add
        print(f"request:!:!:!:! {request}")
        print(f"request:!:!:!:! {request.data}")

        if request.data.get("action") == "add":
            item_id = request.data.get("item_id")
            item = Item.objects.get(id=item_id)
            cart, created = Cart.objects.get_or_create(owner=request.user)

            # trying to add already existing item
            if CartItem.objects.filter(item_id=item_id, cart=cart).exists():
                return Response({"error": "Item is already in cart."}, status=400)
            
            cart_item = CartItem.objects.create(
                cart=cart,
                item_id=item.id,
                title=item.title,
                owner=item.owner,
                price=item.price
                )

            cart_item.save() 
            return Response({"success": True, "cart_item_id": cart_item.id})

        # remove
        if request.data.get("action") == "remove":
            item_id = request.data.get("item_id")
            cart = Cart.objects.get(owner=request.user)
            cart_item = CartItem.objects.get(cart=cart, item_id=item_id)
            cart_item.delete()
            return Response({"success": True, "cart_item_id": cart_item.id})

class CheckOutView(APIView):

    def get(self, request, *args, **kwargs):
        cart = Cart.objects.get(owner=request.user)
        cart_items = cart.items.all()
        item_messages = {}

        for cart_item in cart_items:
            # item no longer exists
            if not Item.objects.get(id=cart_item.item_id):
                item_messages.update({cart_item: "item has been removed"})
            # modifications to item fields
            if cart_item.item.last_modified is not cart_item.date_added:
                item_messages.update({cart_item: "item has changed"})
        
        return Response({"error": True, "cart":cart.id, "messages":item_messages})
    
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        cart = Cart.objects.get(owner=request.user)
        cart_items = cart.items.all()
        items = []
        # do same checks
        # if nothing wrong;
        # lock items 
        for cart_item in cart_items:
            item = Item.objects.get(id=cart_item.item_id)
            SoldItem.objects.create(
                title="", 
                owner=cart_item.item.owner,
                buyer=request.user,
                price=cart_item.price, 
                )
            item.delete()
            cart_item.delete() 

        # jämför cart items w real items 
        # om samma, genomför köp
        # = clear cart, ändra items ti sold, gör cart items ti purchased? 