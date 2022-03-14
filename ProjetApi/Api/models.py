from django.db import models


# Create your models here.
class Patient(models.Model):
    prenom = models.CharField(max_length=36)
    nom = models.CharField(max_length=36)
    age = models.IntegerField(null=True)
