from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include

urlpatterns = [
    path('api/', include('Api.urls')),
    path('', admin.site.urls),

]
