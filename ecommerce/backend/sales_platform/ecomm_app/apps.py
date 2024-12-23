from django.apps import AppConfig


class EcommAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ecomm_app'
    
    def ready(self):
        import ecomm_app.signals
