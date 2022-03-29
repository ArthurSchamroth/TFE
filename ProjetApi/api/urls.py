from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import FichePatientViewSet, UserViewSet, TokenViewSet

router = routers.DefaultRouter()
router.register('fichePatient', FichePatientViewSet)
router.register('users', UserViewSet)
router.register('tokens', TokenViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
