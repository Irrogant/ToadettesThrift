from django.shortcuts import render
from django.db.models import Sum
from users.models import User
from shop.models import Item, SoldItem
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views import View
from django.shortcuts import redirect
from django.conf import settings

# TODO: fixa cavegrej ti landing


class LandingView(View):

    def get(self, request, *args, **kwargs):
        itemAmount = Item.objects.all().count()
        return render(request, "landing.html", {'itemAmount': itemAmount})

    def post(self, request, *args, **kwargs):
        button = request.POST.get("button")

        if button == "proceed":
            response = redirect(settings.FRONTEND_URL)
            response.set_cookie('already_landed', 'True')
            return response

        if button == "populate":
            # Emptying database
            User.objects.all().delete()
            Item.objects.all().delete()

            # Creating admin user
            admin = User.objects.create_superuser("admin", "admin", "admin")
            admin.save()
            # Creating six users with numbers 1-6
            for i in range(1, 7):
                user = User.objects.create_user(
                    "testuser%s" % i, "testuser%s@example.com" % i, "pass%s" % i)
                user.save()
                # Giving items to half of the users
                if i % 2 == 0:
                    item = Item(title="Item %s" % i, price=20.00, owner=user)
                    item.save()
            message = "you successfully populated the DB congratulations wow insane we are truly impressed!!1"

        if button == "empty":
            User.objects.all().delete()
            Item.objects.all().delete()
            message = "why tf would you do that"
            # Fetching the total amount of objects by adding together amount fields

        itemAmount = Item.objects.all().count()
        return render(request, "landing.html", {'itemAmount': itemAmount, 'message': message})


# curl -X GET "http://localhost:7000/myitems/" -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}"
class ItemsView(APIView):

    def get(self, request, *args, **kwargs):
        on_sale_items = Item.objects.all().filter(owner=request.user)
        sold_items = SoldItem.objects.all().filter(seller=request.user)
        purchased_items = SoldItem.objects.all().filter(buyer=request.user)

        return Response({"items": [
            {
                "on_sale_items": [
                    {
                        "id": item.id,
                        "title": item.title,
                        "description": item.description,
                        "price": str(item.price),
                        "date_added": item.date_added,
                        "owner": item.owner.username,
                    } for item in on_sale_items
                ],
                "sold_items": [
                    {
                        "id": sold_item.id,
                        "title": sold_item.title,
                        "price": str(sold_item.price),
                        "sold_at": sold_item.sold_at,
                        "seller": sold_item.seller.username,
                        "buyer": sold_item.buyer.username,
                    } for sold_item in sold_items
                ],
                "purchased_items": [
                    {
                        "id": purchased_item.id,
                        "title": purchased_item.title,
                        "price": str(purchased_item.price),
                        "sold_at": purchased_item.sold_at,
                        "seller": purchased_item.seller.username,
                        "buyer": purchased_item.buyer.username,
                    } for purchased_item in purchased_items
                ]

            }
        ]})


class ItemDetail(APIView):

    def get(self, request, *args, **kwargs):
        print("YHAAAAAAAHAHAYAAH")
        query = request.GET.get("id")
        item = Item.objects.get(id=query)

        print(item)

        return Response({"item": {
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "price": str(item.price),
            "date_added": item.date_added,
            "owner": item.owner.username
        }})

    # curl -X POST "http://localhost:7000/itemdetail/?id={item_id}" -H "Content-Type: application/json" -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}" -d '{"title":"freshaf"}'
    # TODO: only allow edit if item is on sale (not already sold)
    def post(self, request, *args, **kwargs):
        query = request.GET.get("id")
        item = Item.objects.get(id=query)

        # TODO: dehär rn alltid true
        if not item:
            return Response({"error": "Item not found."}, status=400)

        if request.user != item.owner:
            return Response({"error": "Only the owner an item can edit it."}, status=400)

        # TODO: dehär rn alltid true
        # if item:
        #     item.title = request.data.get("title")
        #     item.description = request.data.get("description")
        #     item.price = request.data.get("price")

        for field in ["title", "description", "price", "status"]:
            if field in request.data:
                setattr(item, field, request.data[field])

        item.save()
        return Response({"success": True, "item_id": item.id})


class SearchItemsView(APIView):

    def get(self, request, *args, **kwargs):
        query = request.GET.get("q", "")
        search_items = Item.objects.all().filter(title__icontains=query)[:5]
        return Response({"items": [
            {
                "id": item.id,
                "title": item.title,
                "description": item.description,
                "price": str(item.price),
                "date_added": item.date_added,
            } for item in search_items
        ]})


class AllItemsView(APIView):

    def get(self, request, *args, **kwargs):
        all_items = Item.objects.all()
        return Response({"items": [
            {
                "id": item.id,
                "title": item.title,
                "description": item.description,
                "price": str(item.price),
                "date_added": item.date_added,
                "owner": item.owner.username
            } for item in all_items
        ]})

# TODO: loging only
# curl -X POST "http://localhost:7000/createitem/" -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}" -d '{"title":"Sample Item","description":"This is a sample description.","price":25.99}'


class CreateItemView(APIView):

    def post(self, request, *args, **kwargs):
        print(request.data)
        title = request.data.get("title")
        description = request.data.get("description", "")
        price = request.data.get("price")

        if not title or not price:
            return Response({"error": "Title and price are required."}, status=400)

        item = Item(
            title=title,
            description=description,
            price=price,
            owner=request.user
        )
        item.save()
        return Response({"success": True, "item_id": item.id})
