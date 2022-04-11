from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import FichePatientViewSet, UserViewSet, TokenViewSet, \
    CommentaireViewSet, RendezVousViewSet

router = routers.DefaultRouter()
router.register('commentaires', CommentaireViewSet)
router.register('fichePatient', FichePatientViewSet)
router.register('users', UserViewSet)
router.register('tokens', TokenViewSet)
router.register('rendezVous', RendezVousViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
