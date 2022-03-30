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
                user = request.user
                token = request.data['token']
                patient_wth_token = Token.objects.get(key=token)
                user = patient_wth_token.user.username
                email = patient_wth_token.user.email
                response = {'username': user, 'email': email}
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
    # Getting the specific PatientFiche here it's based on only the surname after i'll make my request with name +
    # surname

    @action(detail=False, methods=["POST"])
    def getSpecificFiche(self, request, prenom=None):
        patient = None
        if 'prenom' in request.data:
            try:
                user = request.user
                prenom = request.data['prenom']
                patient = FichePatient.objects.get(prenom=prenom)
                print("requete faite par", user)
            except:
                print("pas de nom")
            response = {'message': 'it s working'}
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)
