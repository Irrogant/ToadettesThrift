from django.shortcuts import render
from django.db.models import Sum
from users.models import User
from shop.models import Item


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
