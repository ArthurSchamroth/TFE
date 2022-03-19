from rest_framework import serializers
from .models import FichePatient
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class FichePatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = FichePatient
        fields = ('id', 'user', "nom", "prenom", "age", "adresse_mail", "description_probleme", "adresse")