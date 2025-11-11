from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import User

    
# TODO: if already logged in, 
class UsernameLoginView(APIView):
    """
    Custom login view that enforces username + password login.
    """

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Log in with username and password."})
    
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        print(username, password)

        if not username or not password:
            return Response({"error": "Username and password required."}, status=400)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"success": True})
        else:
            return Response({"error": "Invalid credentials."}, status=400)
        