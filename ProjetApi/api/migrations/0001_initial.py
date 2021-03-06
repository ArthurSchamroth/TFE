# Generated by Django 4.0 on 2022-03-18 16:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='FichePatient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=32)),
                ('prenom', models.CharField(max_length=64)),
                ('age', models.DateField()),
                ('adresse_mail', models.EmailField(max_length=256, unique=True)),
                ('description_probleme', models.TextField(blank=True, max_length=1024)),
                ('adresse', models.CharField(max_length=64)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user')),
            ],
            options={
                'unique_together': {('nom', 'prenom')},
                'index_together': {('nom', 'prenom')},
            },
        ),
    ]
