from mongoengine import Document, StringField, EmailField, DateTimeField

# Create your models here.
class Contact(Document):
    name = StringField(required=True, max_length=100)
    email = EmailField(required=True, unique=True)
    phone = StringField(required=True, max_length=15)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    def __str__(self):
        return self.name