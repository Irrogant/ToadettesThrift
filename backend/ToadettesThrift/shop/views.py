from django.shortcuts import render
from users.models import User
from shop.models import Item, SoldItem
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views import View
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from django.core.management import call_command
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys

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
                        "date_created": item.date_created,
                        "owner": item.owner.username,
                        "image": item.image_url
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
                        "image": sold_item.image_url
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
                        "image": purchased_item.image_url
                    } for purchased_item in purchased_items
                ]

            }
        ]})


class ItemDetail(APIView):

    def get(self, request, *args, **kwargs):
        query = request.GET.get("id")
        item = Item.objects.get(id=query)

        return Response({"item": {
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "price": str(item.price),
            "date_added": item.date_created,
            "owner": item.owner.username,
            "image": item.image_url
        }})

    # curl -X POST "http://localhost:7000/itemdetail/?id={item_id}" -H "Content-Type: application/json" -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}" -d '{"title":"freshaf"}'
    def put(self, request, *args, **kwargs):

        query = request.GET.get("id")

        image = request.FILES.get("image")

        try:
            item = Item.objects.get(id=query)
        except Item.DoesNotExist:
            return Response({"error": "Item does not exist."}, status=400)

        if request.user != item.owner:
            return Response({"error": "Only the owner of an item can edit it."}, status=400)

        for field in ["title", "description", "price", "status"]:
            if field in request.data:
                setattr(item, field, request.data[field])

        if image:
            item.image = image

        item.save()
        return Response({"success": True, "item_id": item.id})

    def delete(self, request, *args, **kwards):
        try:
            query = request.GET.get("id")
            item = Item.objects.get(id=query)
            if request.user != item.owner:
                return Response({"error": "Only the owner of an item can delete it."}, status=400)
            item.delete()
            return Response({"success": True, "item_id": query}, status=200)

        except:
            return Response({"error": "Failed to delete item."}, status=400)


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
                "date_created": item.date_created,
                "image": item.image_url
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
                "date_created": item.date_created,
                "owner": item.owner.username,
                "image": item.image_url
            } for item in all_items
        ]})

# curl -X POST "http://localhost:7000/createitem/" -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}" -d '{"title":"Sample Item","description":"This is a sample description.","price":25.99}'


class CreateItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        title = request.data.get("title")
        description = request.data.get("description", "")
        price = request.data.get("price")
        image = request.FILES.get("image")

        if not title or not price:
            return Response({"error": "Title and price are required."}, status=400)

        item = Item(
            title=title,
            description=description,
            price=price,
            owner=request.user
        )

        if image:
            # Open image with Pillow
            img = Image.open(image)

            # Crop to square (centered)
            width, height = img.size
            min_dim = min(width, height)
            left = (width - min_dim) / 2
            top = (height - min_dim) / 2
            right = (width + min_dim) / 2
            bottom = (height + min_dim) / 2
            img_cropped = img.crop((left, top, right, bottom))

            # Resize to 150x150
            img_resized = img_cropped.resize((150, 150), Image.ANTIALIAS)

            # Save cropped and resized image to memory
            output = BytesIO()
            img_format = img.format if img.format else 'PNG'
            img_resized.save(output, format=img_format)
            output.seek(0)

            # Create a new InMemoryUploadedFile
            image_file = InMemoryUploadedFile(
                output,
                'ImageField',
                image.name,
                image.content_type,
                sys.getsizeof(output),
                None
            )

            item.image = image_file

        item.save()
        return Response({"success": True, "item_id": item.id, "image_url": item.image.url if item.image else None}, status=201)
