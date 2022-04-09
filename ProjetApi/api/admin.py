from django.contrib import admin
from .models import FichePatient
from .models import Commentaire

# Register your models here.
admin.site.register(FichePatient)
admin.site.register(Commentaire)

