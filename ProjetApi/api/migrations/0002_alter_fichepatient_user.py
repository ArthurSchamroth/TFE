# Generated by Django 4.0 on 2022-03-30 15:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fichepatient',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
        ),
    ]