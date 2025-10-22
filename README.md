<<<<<<< HEAD
# Gas-Station
A simple backend API for a gas station finder application, built with Python, Flask, and SQLite. Provides CRUD operations and a 'find nearby' feature
=======
# 🛢️ Gas Station Finder - Backend API

A simple and lightweight backend for a **Gas (Cooking) Station Finder** application, built with **Flask** and **SQLite**.  
It provides a **RESTful API** for creating, reading, updating, and deleting gas station information — including a **“Find Nearby Stations”** feature based on location.

---

## 🚀 Features

- 🧭 Find nearby gas stations by coordinates  
- 🏷️ CRUD operations for gas stations  
- 📍 Filter stations by status (e.g., Open, Closed, Low Stock)  
- 📅 Automatic timestamps for updates  
- 🌐 CORS-enabled for frontend integration  

---

## ⚙️ Setup and Installation

### 1. Prerequisites
Ensure you have:
- **Python 3.6+**
- **pip** (Python package manager)

### 2. Clone the Repository
```bash
git clone https://github.com/Anonymous23r56/Gas-Station
cd gas-station-backend
```

### 3. Install Dependencies
```bash
pip install Flask Flask-Cors
```

### 4. Run the Server
```bash
python app.py
```
You should see something like:

 * Running on http://127.0.0.1:5000/
 * Running on http://<your-local-ip>:5000/
The API is now live and ready to accept requests.

📡 API Documentation
- Base URL:
```bash
http://<server-ip>:5000
```

## 1. Get All Gas Stations
- Endpoint: ```bash /api/stations```
  Method: ```bash GET```
Query Parameters (optional):

- ```bash status``` → Filter stations by their status (e.g., ```bash ?status=Open```)

Example Response:
```json
[
  {
    "id": 1,
    "name": "Naija Gas - Surulere",
    "address": "123 Bode Thomas, Surulere, Lagos",
    "latitude": 6.4996,
    "longitude": 3.3418,
    "price_kg": 950.50,
    "status": "Open",
    "last_updated": "2025-10-17 22:10:00"
  }
]
```

## 2. Get a Single Gas Station
Endpoint: ```bash /api/stations/<id>```
Method: ```bash GET```

Example Response:
```json
{
  "id": 1,
  "name": "Naija Gas - Surulere",
  "address": "123 Bode Thomas, Surulere, Lagos",
  "latitude": 6.4996,
  "longitude": 3.3418,
  "price_kg": 950.50,
  "status": "Open",
  "last_updated": "2025-10-17 22:10:00"
}
```

## 3. Find Nearby Stations
Endpoint: ```bash /api/stations/nearby```
Method: ```bash GET```

Query Parameters (required):

```bash lat```: User latitude (e.g.,```bash 6.544```)

```bash lon```: User longitude (e.g., ```bash 3.3792```)

```bash radius```: Search radius in kilometers (e.g., ```bash 5```)

Example URL:
```bash
/api/stations/nearby?lat=6.5244&lon=3.3792&radius=10
```
Example Response:
```json
[
  {
    "id": 1,
    "name": "Naija Gas - Surulere",
    "address": "123 Bode Thomas, Surulere, Lagos",
    "latitude": 6.4996,
    "longitude": 3.3418,
    "price_kg": 950.5,
    "status": "Open",
    "distance_km": 3.25,
    "last_updated": "2025-10-17 22:10:00"
  }
]
```

## 4. Create a New Gas Station
Endpoint: ```bash /api/stations```

Method: ```bash POST```

Request Body:
```json
{
  "name": "New Gas Place - Lekki",
  "address": "789 Admiralty Way, Lekki",
  "price_kg": 1050.00,
  "status": "Open",
  "latitude": 6.4336,
  "longitude": 3.4832
}
```

Response (```bash 201 Created```):
Returns the newly created station object.

## 5. Update a Gas Station
Endpoint: ```bash /api/stations/<id>```
Method: ```bash PUT```

Request Body (partial allowed):
```json
{
  "price_kg": 995.00,
  "status": "Low Stock"
}
```
Response (200 OK):
Returns the full, updated station object.

## 6. Delete a Gas Station
Endpoint: ```bash /api/stations/<id>```
Method: ```bash DELETE```

Response (200 OK):
```json
{
  "message": "Gas station deleted successfully"
}
```

### 🧭 Pushing to GitHub

## 1. Create a Repository
Go to GitHub → New Repository → Name it (e.g., gas-station-backend).

## 2. Initialize Git
```bash git init```

## 3. Add and Commit Files
```bash git add .```

```bash git commit -m "Initial commit: Flask API for gas station finder"```

## 4. Link Remote Repository
```bash git branch -M main```

``` bash git remote add origin https://github.com/your-username/gas-station-backend.git```

## 5. Push to GitHub
``` bash git push -u origin main```

Your code is now live on GitHub! 🎉

🧰 Tech Stack

- Backend: Flask (Python)

- Database: SQLite

- Libraries: Flask-Cors

- Architecture: RESTful API

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

🪪 License

This project is open-source and available under the MIT License.

💡 Author

Samuel Olokor

Backend Developer | Tech Enthusiast

📧 [samuelolokor228@gmail.com ]

🌍 [https://www.linkedin.com/in/samuel-olokor-a073bb326/]



>>>>>>> 617270bc5430eb293a4dae146ff16e87ac21c67c
