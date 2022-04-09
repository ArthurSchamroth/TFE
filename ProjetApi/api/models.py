from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class FichePatient(models.Model):
    type_kine = (
        ('K', 'Kinésithérapie'),
        ('OS', 'Osthéopatie'),
        ('KR', 'Kinésithérapie Respiratoire'),
        ('P', 'Pédiatrie')
    )
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    nom = models.CharField(max_length=32)
    prenom = models.CharField(max_length=64)
    age = models.DateField(blank=True)
    adresse_mail = models.EmailField(max_length=256, unique=True)
    type_kine = models.CharField(max_length=2, choices=type_kine, blank=True)
    description_probleme = models.TextField(max_length=1024, blank=True)
    adresse = models.CharField(max_length=64, blank=True)

    class Meta:
        unique_together = (('nom', 'prenom'),)
        index_together = (('nom', 'prenom'),)


class Commentaire(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    auteur_nom = models.CharField(max_length=32)
    auteur_prenom = models.CharField(max_length=32)
    commentaire = models.TextField(max_length=1024)
    date_heure = models.DateTimeField(auto_now_add=True)


