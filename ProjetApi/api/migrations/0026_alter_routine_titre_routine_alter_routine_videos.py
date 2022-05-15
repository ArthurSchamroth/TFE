# Generated by Django 4.0 on 2022-05-11 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_alter_routine_titre_routine'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routine',
            name='titre_routine',
            field=models.CharField(max_length=1024, unique=True),
        ),
        migrations.AlterField(
            model_name='routine',
            name='videos',
            field=models.ManyToManyField(null=True, to='api.VideoTuto'),
        ),
    ]