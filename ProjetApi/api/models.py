from django.db import models

# Create your models here.


class Patient(models.Model):
    nom = models.CharField(max_length=36)
    prenom = models.CharField(max_length=64)

