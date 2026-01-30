from rest_framework.views import APIView
from carts.models import Cart, CartItem
from shop.models import Item, SoldItem
from rest_framework.response import Response
from django.db import transaction
from rest_framework.permissions import IsAuthenticated

# TODO: clean input values
# TODO: make sure only cart owner can see and modify own cart
# curl -X POST "http://localhost:7000/cart/" -H "Content-Type: application/json" -H "Cookie: sessionid=mhnff9ml9eqfrn3f0ggjebuqnbk2hub6; csrftoken=RdLZOL6VsOtfKCM3NhzELnW6Qd4O1kSu" -H "X-CSRFToken: RdLZOL6VsOtfKCM3NhzELnW6Qd4O1kSu" -d '{"cart_item_id":1,"action":"remove"}'


def syncCart(cart):

    item_messages = {}

    cart_items = cart.items.all()

    for cart_item in cart_items:
        try:
            item = Item.objects.get(id=cart_item.item_id)
        except Item.DoesNotExist:
            item_messages.update(
                {cart_item.item_id: "item is no longer for sale"})
            continue

        changes = []

        # modifications to item fields
        if item.last_modified > cart_item.date_added:

            if cart_item.price != item.price:
                cart_item.price = item.price
                changes.append("price")

            if cart_item.title != item.title:
                cart_item.title = item.title
                changes.append("information")

            if changes:
                cart_item.save()
                item_messages[cart_item.item_id] = f"Item {' and '.join(changes)} has changed"

    return item_messages


class CartView(APIView):
    permission_classes = [IsAuthenticated]
    # TODO: serializers?

    def get(self, request, *args, **kwargs):
        cart, _ = Cart.objects.get_or_create(owner=request.user)
        cart_items = cart.items.all()
        return Response({"items": [
            {
                        "id": cart_item.item_id,
                        "title": cart_item.title,
                        "price": str(cart_item.price),
                        "date_added": cart_item.date_added,
                        "owner": cart_item.owner.username,
                        } for cart_item in cart_items
        ]})

    def post(self, request, *args, **kwargs):
        action = request.data.get("action")
        cart, _ = Cart.objects.get_or_create(owner=request.user)

        if action == "add":
            try:
                item_id = request.data.get("item_id")
                item = Item.objects.get(id=item_id)

                # prevent user to add their own items to cart

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
            except:
                return Response({"error": "Failed to add to cart."}, status=400)

        if action == "remove":
            try:
                item_id = request.data.get("item_id")
                cart_item = CartItem.objects.get(cart=cart, item_id=item_id)
                cart_item.delete()
                return Response({"success": True, "cart_item_id": cart_item.id})
            except:
                return Response({"error": "Failed to remove from cart."}, status=400)

        if action == "sync":
            try:
                item_messages = syncCart(cart)
                return Response({"success": True, "messages": item_messages})
            except Exception as e:
                return Response({"error": f"Failed to sync cart: {str(e)}"}, status=400)


class CheckOutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        cart = Cart.objects.get(owner=request.user)
        cart_items = cart.items.all()
        item_messages = {}

        for cart_item in cart_items:
            try:
                item = Item.objects.get(id=cart_item.item_id)
            except:
                item_messages.update({cart_item: "item has been removed"})

            # modifications to item fields
            if item.last_modified >= cart_item.date_added:
                item_messages.update({cart_item: "item has changed checkout"})

        return Response({"cart": cart.id, "messages": item_messages})

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        try:
            print("POSTNNNHHHYAHHH")
            cart = Cart.objects.get(owner=request.user)
            cart_items = cart.items.all()
            cart_price = 0
            items = []
            item_messages = {}

            item_messages = syncCart(cart)

            if item_messages:
                return Response({"error": f"Changes has been made to cart items", "messages": item_messages})

            for cart_item in cart_items:
                item = Item.objects.get(id=cart_item.item_id)
                sold_item = SoldItem.objects.create(
                    title=item.title,
                    seller=item.owner,
                    buyer=request.user,
                    price=item.price,
                )
                cart_price += item.price
                item.delete()
                cart_item.delete()
                items.append(sold_item)

            return Response({"success": True, "cart_item_id": cart_item.id, "updateMessage": "Purchase completed!"})
        except:
            return Response({"error": "Failed to perform purchase"}, status=400)
