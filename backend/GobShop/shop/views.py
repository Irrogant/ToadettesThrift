from django.shortcuts import render
from django.db.models import Sum
from users.models import User
from shop.models import Item
from rest_framework.views import APIView
from rest_framework.response import Response


def landing(request):

    if request.method == "POST":
        # Emptying database
        User.objects.all().delete()
        Item.objects.all().delete()
        # Creating admin user
        admin = User.objects.create_superuser("admin","admin","admin")
        admin.save()
        # Creating six users with numbers 1-6
        for i in range(1,7): 
            user = User.objects.create_user("testuser%s" % i, "testuser%s@example.com" % i, "pass%s" % i)
            user.save()
            # Giving items to half of the users
            if i % 2 == 0: 
                item = Item(title="Item %s" % i, amount=10, price=20.00, owner=user)
                item.save()

    # Fetching the total amount of objects by adding together amount fields
    itemAmount = Item.objects.aggregate(Sum("amount"))['amount__sum']
    return render(request, "landing.html", {'itemAmount':itemAmount})


# curl -X GET "http://localhost:7000/myitems/" -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}"
class ItemsView(APIView):

    def get(self, request, *args, **kwargs):
        user_items = Item.objects.all().filter(owner=request.user)

        return Response({"items": [
            {
                "id": item.id,
                "title": item.title,
                "amount": item.amount,
                "description": item.description,
                "price": str(item.price),
                "date_added": item.date_added,
                "status": item.status,
            } for item in user_items
        ]})

class AllItemsView(APIView):

    def get(self, request, *args, **kwargs):
        all_items = Item.objects.all()
        return Response({"items": [
            {
                "id": item.id,
                "title": item.title,
                "amount": item.amount,
                "description": item.description,
                "price": str(item.price),
                "date_added": item.date_added,
                "status": item.status,
            } for item in all_items
        ]})

# TODO: loging only
# curl -X POST "http://localhost:7000/createitem/" -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}" -d '{"title":"Sample Item","amount":10,"description":"This is a sample description.","price":25.99}'
class CreateItemView(APIView):

    def post(self, request, *args, **kwargs):
        title = request.data.get("title")
        amount = request.data.get("amount")
        description = request.data.get("description", "")
        price = request.data.get("price")

        if not title or not amount or not price:
            return Response({"error": "Title, amount, and price are required."}, status=400)

        item = Item(
            title=title,
            amount=amount,
            description=description,
            price=price,
            owner=request.user
        )
        item.save()
        return Response({"success": True, "item_id": item.id})