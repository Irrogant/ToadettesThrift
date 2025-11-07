from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.

def login(request):

    return render(request, 'users/login.html')


def LoginView(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request,user)
            return redirect('accounts:login')
    else:
        form = AuthenticationForm()
    return render(request,'accounts/login.html', {'form':form})