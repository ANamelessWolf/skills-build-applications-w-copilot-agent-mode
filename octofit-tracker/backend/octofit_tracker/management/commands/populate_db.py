from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from djongo import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Eliminar datos previos
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Crear equipos
        marvel = Team.objects.create(name='Marvel', description='Equipo de superhéroes Marvel')
        dc = Team.objects.create(name='DC', description='Equipo de superhéroes DC')

        # Crear usuarios
        users = [
            User(email='ironman@marvel.com', name='Iron Man', team='Marvel', is_superhero=True),
            User(email='spiderman@marvel.com', name='Spider-Man', team='Marvel', is_superhero=True),
            User(email='batman@dc.com', name='Batman', team='DC', is_superhero=True),
            User(email='wonderwoman@dc.com', name='Wonder Woman', team='DC', is_superhero=True),
        ]
        User.objects.bulk_create(users)

        # Crear actividades
        Activity.objects.create(user='Iron Man', activity_type='Running', duration=30, date='2026-02-25')
        Activity.objects.create(user='Spider-Man', activity_type='Cycling', duration=45, date='2026-02-24')
        Activity.objects.create(user='Batman', activity_type='Swimming', duration=60, date='2026-02-23')
        Activity.objects.create(user='Wonder Woman', activity_type='Yoga', duration=50, date='2026-02-22')

        # Crear leaderboard
        Leaderboard.objects.create(team='Marvel', points=200)
        Leaderboard.objects.create(team='DC', points=180)

        # Crear workouts
        Workout.objects.create(name='Pushups', description='Upper body strength', difficulty='Easy')
        Workout.objects.create(name='Squats', description='Lower body strength', difficulty='Medium')

        # Crear índice único en email
        db = connection.cursor().db_conn
        db.users.create_index([('email', 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('Base de datos poblada con datos de prueba.'))
