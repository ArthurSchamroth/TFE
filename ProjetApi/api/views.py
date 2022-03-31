from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import FichePatient
from .serializers import FichePatientSerializer, UserSerializer, TokenSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class TokenViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    @action(detail=False, methods=['POST'])
    def getSpecificToken(self, request, token=None):
        if 'token' in request.data:
            try:
                print(request.data)
                user = request.user
                token = request.data['token']
                patient_wth_token = Token.objects.get(key=token)
                user = patient_wth_token.user.username
                email = patient_wth_token.user.email
                prenom = patient_wth_token.user.first_name
                nom = patient_wth_token.user.last_name
                response = {'username': user, 'email': email, 'prenom': prenom, 'nom':nom}
                return Response(response, status=status.HTTP_200_OK)

            except:
                print("token inconnu")

        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)


class FichePatientViewSet(viewsets.ModelViewSet):
    queryset = FichePatient.objects.all()
    serializer_class = FichePatientSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    # Getting the specific PatientFiche here it's based the username

    @action(detail=False, methods=["POST"])
    def getSpecificFiche(self, request, user=None):
        if 'username' in request.data:
            try:
                username = request.data['username']
                patient = FichePatient.objects.get(prenom=username)
                nom = patient.nom
                prenom = patient.prenom
                naissance = patient.age
                adresse = patient.adresse
                adresse_mail = patient.adresse_mail
                description_prob = patient.description_probleme
                response = {'nom': nom, 'prenom': prenom, 'naissance': naissance,
                            'adresse': adresse, 'adresse_mail': adresse_mail,
                            'description_prob': description_prob}
                return Response(response, status=status.HTTP_200_OK)

            except:
                print("pas de nom")
                response = {'message': 'it s not working'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)
