# Generated by Django 4.0 on 2022-03-31 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_fichepatient_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fichepatient',
            name='description_probleme',
            field=models.TextField(max_length=1024),
        ),
    ]