# Contact Manager (React + Django + MongoDB)

A simple **Contact Manager** application built with **React (frontend)**, **Django (backend)**, and **MongoDB (database)**.  
This project demonstrates how to connect React with Django APIs and store data in MongoDB.

---

## 🚀 Features
- Add new contacts (Name, Email, Phone).
- Store contacts in MongoDB.
- Django REST API for backend.
- React frontend with forms.
- CORS enabled for communication between React & Django.

---

## 🛠️ Tech Stack
- **Frontend**: React, Axios, Tailwind CSS
- **Backend**: Django, Django REST Framework, djongo
- **Database**: MongoDB

---

## 📂 Project Structure

contact-manager/
│
├── backend/ # Django backend
│ ├── contact_manager/ # Django project
│ ├── contacts/ # Django app (API)
│ └── manage.py
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ └── ContactForm.js
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/contact-manager.git
cd contact-manager

2️⃣ Backend Setup (Django + MongoDB)
cd backend
python -m venv venv
venv\Scripts\activate   # On Windows
source venv/bin/activate   # On macOS/Linux

pip install django djangorestframework djongo pymongo django-cors-headers


Start Django server:

python manage.py makemigrations
python manage.py migrate
python manage.py runserver


The backend runs at: http://127.0.0.1:8000/

3️⃣ Frontend Setup (React)
cd ../frontend
npm install
npm start


The frontend runs at: http://localhost:3000/

📡 API Endpoints
Method	Endpoint	Description
GET	/contacts/	Fetch all contacts
POST	/contacts/	Add new contact
🖼️ Screenshots

(Add screenshots here once you run the app)

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

📜 License

This project is licensed under the MIT License.
