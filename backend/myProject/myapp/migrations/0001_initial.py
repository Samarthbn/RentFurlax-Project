# Generated by Django 4.1.13 on 2024-02-27 20:50

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('type', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('image', models.ImageField(blank=True, null=True, upload_to='myProject\\static')),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=30, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone', models.CharField(max_length=15)),
                ('address', models.TextField()),
                ('password', models.CharField(max_length=128)),
                ('last_logged_in', models.DateTimeField(auto_now_add=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=20)),
                ('status', models.CharField(choices=[('ORDERED', 'Ordered'), ('CANCELLED', 'Cancelled'), ('DELIVERED', 'Delivered')], max_length=20)),
                ('selectedItems', models.CharField(max_length=50, verbose_name='')),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='')),
                ('generated', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('condition', models.CharField(max_length=255)),
                ('noofdays', models.IntegerField()),
                ('options', models.JSONField()),
                ('rentaloptions', models.JSONField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.category')),
            ],
        ),
    ]
