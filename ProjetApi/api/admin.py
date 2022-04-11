from django.contrib import admin
from .models import FichePatient, Commentaire, RendezVous

# Register your models here.
admin.site.register(FichePatient)
admin.site.register(Commentaire)
admin.site.register(RendezVous)

