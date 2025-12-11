from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import User

    
# TODO: if already logged in, 
# TODO: clean input values
# curl -X POST http://localhost:7000/login/ -H "Content-Type: application/json" -H "X-CSRFToken: {cook}" -b "csrftoken={cook}" -d '{"username":"admin","password":"admin"}'
class UsernameLoginView(APIView):
    """
    Custom login view that enforces username + password login.
    """

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Log in with username and password."})
    
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required."}, status=400)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"success": True})
        else:
            return Response({"error": "Invalid credentials."}, status=400)
        
class LogOutView(APIView):
    """
    View to log out.
    """

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Log out current logged in user."})

    def post (self, request, *args, **kwargs):
        print(request)
        request_user = request.user
        if not request_user.is_authenticated:
            return Response({"Could not locate a current logged in user."}, status=400)
        
        try:
            logout(request)
            return Response({"success": True})
        except:
            return Response({"error": "Failed to log out."}, status=400)


# curl -X POST http://localhost:7000/signup: application/json" -H "X-CSRFToken: {cook}" -b "csrftoken={cook}" -d '{"username":"admin","email": "bla@example.com", "password":"admin"}'
class CreateAccountView(APIView):
    """
    View to create a new user account.
    """

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Register with username, email and password."})

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "Username, email, and password required."}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=400)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "An account with this email already exists."}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return Response({"success": True})


# TODO: log-in required
# curl -X POST http://localhost:7000/account/ -H "Content-Type: application/json" -H "Cookie: sessionid={sess}; csrftoken={cook}" -H "X-CSRFToken: {cook}" -d '{"password":"nytt"}'
class EditAccountView(APIView):
    """
    View to edit account password.
    """

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Edit your password."})

    def post(self, request, *args, **kwargs):

        newPassword = request.data.get("password")

        if not newPassword:
            return Response({"error": "Bro you came here to edit your password didn't you"}, status=400)

        user = request.user
        user.set_password(newPassword)
        user.save()

        return Response({"success": True})
    

class CurrentUserView(APIView):
    """
    View to get current authenticated user info.
    """
    def get(self, request, *args, **kwargs):
        if request.user and request.user.is_authenticated:
            return Response({"authenticated": True, "username": request.user.username, "email": request.user.email})
        return Response({"authenticated": False, "username": None})