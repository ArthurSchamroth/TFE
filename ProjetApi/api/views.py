from django.shortcuts import render
from datetime import datetime
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import FichePatient, Commentaire, RendezVous, Message
from .serializers import FichePatientSerializer, UserSerializer,\
    TokenSerializer, CommentaireSerializer, RendezVousSerializer, MessageSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.forms.models import model_to_dict
import json

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
                id = patient_wth_token.user_id
                user = patient_wth_token.user.username
                email = patient_wth_token.user.email
                prenom = patient_wth_token.user.first_name
                nom = patient_wth_token.user.last_name
                try:
                    ficheId = patient_wth_token.user.fichepatient.id
                    ficheTypeKine = patient_wth_token.user.fichepatient.type_kine
                    response = {'id': id, 'username': user, 'email': email, 'prenom': prenom,
                                'nom': nom, 'fiche': ficheId, "type_kine": ficheTypeKine}
                except:
                    response = {'id': id, 'username': user, 'email': email, 'prenom': prenom,
                                'nom': nom}
                return Response(response, status=status.HTTP_200_OK)

            except:
                print("token inconnu")

        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)


class CommentaireViewSet(viewsets.ModelViewSet):
    queryset = Commentaire.objects.all()
    serializer_class = CommentaireSerializer
    permission_classes = (AllowAny,)

    @action(detail=False, methods=['POST'])
    def update_commentaire(self, request, user=None):
        if 'user' in request.data:
            user_id = request.data['user']
            comm = Commentaire.objects.get(user=user_id)
            comm.auteur_nom = request.data['auteur_nom']
            comm.auteur_prenom = request.data['auteur_prenom']
            comm.commentaire = request.data['commentaire']
            now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            comm.date_heure = now
            comm.save()
            response = {'user': 'ok'}
            return Response(response)
        else:
            response = {'user': 'pas ok'}
            return Response(response)


class FichePatientViewSet(viewsets.ModelViewSet):
    queryset = FichePatient.objects.all()
    serializer_class = FichePatientSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    # Getting the specific PatientFiche here it's based the username

    @action(detail=False, methods=['POST'])
    def update_fiche(self, request, user=None):
        if 'user' in request.data:
            user_id = request.data['user']
            fiche = FichePatient.objects.get(user=user_id)
            fiche.type_kine = request.data['type_kine']
            fiche.description_probleme = request.data['description_probleme']
            fiche.adresse = request.data['adresse']
            fiche.save()

            response = {'user': 'ok'}
            return Response(response)
        else:
            response = {'user': 'pas ok'}
            return Response(response)

    @action(detail=False, methods=["POST"])
    def getSpecificFiche(self, request, user=None):
        if 'username' in request.data:
            try:
                username = request.data['username']
                patient = User.objects.get(username=username)
                id = patient.id
                nom = patient.fichepatient.nom
                prenom = patient.fichepatient.prenom
                naissance = patient.fichepatient.age
                adresse = patient.fichepatient.adresse
                adresse_mail = patient.fichepatient.adresse_mail
                description_prob = patient.fichepatient.description_probleme
                type_besoin = patient.fichepatient.type_kine
                response = {'id': id, 'nom': nom, 'prenom': prenom, 'naissance': naissance,
                            'adresse': adresse, 'adresse_mail': adresse_mail,
                            'description_prob': description_prob, 'type_kine': type_besoin}
                return Response(response, status=status.HTTP_200_OK)

            except:
                response = {'message': 'it s not working'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)


class RendezVousViewSet(viewsets.ModelViewSet):
    queryset = RendezVous.objects.all()
    serializer_class = RendezVousSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=["POST"])
    def getListSpecificRdv(self, request):
        if 'fiche' in request.data:
            try:
                tableau_response = []
                username = request.data['fiche']
                rdvs = RendezVous.objects.filter(user=username)
                for i in rdvs:
                    object = {'id': i.id, 'nom': i.user.nom, 'prenom': i.user.prenom, 'type_kine': i.type_soin,
                              'adresse': i.user.adresse, 'date': i.date, 'heure': i.heure, 'type_rdv': i.type_rdv,
                              'description': i.description}
                    tableau_response.append(object)

                response = {'result': tableau_response}
                return Response(response, status=status.HTTP_200_OK)

            except:
                response = {'message': 'it s not working'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)

    @action(detail=False, methods=["POST"])
    def getRdvByDate(self, request):
        if 'date' in request.data:
            try:
                tableau_response = []
                date = request.data['date']
                rdvs = RendezVous.objects.filter(date=date)
                for i in rdvs:
                    object = {'id': i.id, 'nom': i.user.nom, 'prenom': i.user.prenom, 'type_kine': i.type_soin,
                              'adresse': i.user.adresse, 'date': i.date, 'heure': i.heure, 'type_rdv': i.type_rdv,
                              'description': i.description}
                    tableau_response.append(object)

                response = {'result': tableau_response}
                return Response(response, status=status.HTTP_200_OK)

            except:
                response = {'message': 'it s not working'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)

    @action(detail=False, methods=["POST"])
    def getSpecificRdv(self, request):
        if 'commentaire' in request.data:
            try:
                commentaire = request.data['commentaire']
                rdv = RendezVous.objects.get(id=commentaire)
                id = rdv.id
                nom = rdv.user.nom
                prenom = rdv.user.prenom
                adresse = rdv.user.adresse
                type_kine = rdv.user.type_kine
                date = rdv.date
                heure = rdv.heure
                description = rdv.description
                response = {'id': id, 'nom': nom, 'prenom': prenom, 'adresse': adresse, 'type_kine': type_kine,
                            'date': date, 'heure': heure, 'description': description}
                return Response(response, status=status.HTTP_200_OK)

            except:
                response = {'message': 'it s not working'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=["POST"])
    def getMessagesFromSpecificUser(self, request):
        if 'dest' in request.data:
            try:
                tableau_response = []
                username = request.data['dest']
                messages = Message.objects.filter(dest=username)
                for i in messages:
                    object = {'id': i.id, 'date': i.date, 'heure': i.heure, 'dest': i.dest,
                              'contenu': i.contenu}
                    tableau_response.append(object)

                response = {'result': tableau_response}
                return Response(response, status=status.HTTP_200_OK)

            except:
                response = {'message': 'it s not working'}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'NOOOOO'}
            return Response(response, status=status.HTTP_200_OK)

