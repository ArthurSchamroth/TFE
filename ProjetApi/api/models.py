from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class FichePatient(models.Model):
    list_display = ('email', 'nom', 'prenom')
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    nom = models.CharField(max_length=32)
    prenom = models.CharField(max_length=64)
    age = models.DateField()
    adresse_mail = models.EmailField(max_length=256, unique=True)
    description_probleme = models.TextField(max_length=1024, blank=True)
    adresse = models.CharField(max_length=64)

    class Meta:
        unique_together = (('nom', 'prenom'),)
        index_together = (('nom', 'prenom'),)

