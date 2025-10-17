<<<<<<< HEAD
Gas Station Finder - Backend APIThis is a simple, lightweight backend for a Gas (Cooking) Station Finder application, built with Flask and SQLite.It provides a RESTful API for creating, reading, updating, and deleting gas station information.Setup and Running the Server1. Prerequisites:Python 3.6+ installedpip (Python package installer)2. Install Dependencies:Open your terminal in the project directory and run:pip install Flask Flask-Cors
3. Run the Server:From the same directory, run the main Python file:python app.py
The server will start, and you should see output like this: * Running on [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
 * Running on http://[your-local-ip-address]:5000/
The API is now live and ready to accept requests.API Documentation for FrontendHere are the available endpoints your frontend can connect to. The base URL will be http://<server-ip>:5000.1. Get All Gas StationsEndpoint: /api/stationsMethod: GETDescription: Retrieves a list of all gas stations. Can be filtered by status.Query Parameters (Optional):status: Filter stations by their status. (e.g., ?status=Open)Success Response (200 OK):[
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
2. Get a Single Gas StationEndpoint: /api/stations/<id>Method: GETDescription: Retrieves details for a specific gas station.Success Response (200 OK):{
  "id": 1,
  "name": "Naija Gas - Surulere",
  "address": "123 Bode Thomas, Surulere, Lagos",
  "latitude": 6.4996,
  "longitude": 3.3418,
  "price_kg": 950.50,
  "status": "Open",
  "last_updated": "2025-10-17 22:10:00"
}
3. Find Nearby StationsEndpoint: /api/stations/nearbyMethod: GETDescription: Finds all stations within a specified radius of a user's location. The stations are returned sorted by the closest first.Query Parameters (Required):lat: The user's latitude (e.g., 6.5244).lon: The user's longitude (e.g., 3.3792).radius: The search radius in kilometers (e.g., 5).Example URL:/api/stations/nearby?lat=6.5244&lon=3.3792&radius=10Success Response (200 OK):[
    {
        "address": "123 Bode Thomas, Surulere, Lagos",
        "distance_km": 3.25,
        "id": 1,
        "last_updated": "2025-10-17 22:10:00",
        "latitude": 6.4996,
        "longitude": 3.3418,
        "name": "Naija Gas - Surulere",
        "price_kg": 950.5,
        "status": "Open"
    }
]
4. Create a New Gas StationEndpoint: /api/stationsMethod: POSTDescription: Adds a new gas station to the database.Request Body (JSON):{
  "name": "New Gas Place - Lekki",
  "address": "789 Admiralty Way, Lekki",
  "price_kg": 1050.00,
  "status": "Open",
  "latitude": 6.4336,
  "longitude": 3.4832
}
Success Response (201 Created):Returns the newly created station object.5. Update a Gas StationEndpoint: /api/stations/<id>Method: PUTDescription: Updates one or more fields of an existing gas station.Request Body (JSON):(Include only the fields you want to change){
  "price_kg": 995.00,
  "status": "Low Stock"
}
Success Response (200 OK):Returns the full, updated station object.6. Delete a Gas StationEndpoint: /api/stations/<id>Method: DELETEDescription: Removes a gas station from the database.Success Response (200 OK):{
  "message": "Gas station deleted successfully"
}
Pushing to GitHubFollow these steps to upload your project to a GitHub repository.1. Create a Repository on GitHub:Go to GitHub.com, click the + in the top-right corner, and select "New repository". Give it a name (e.g., gas-station-backend), and click "Create repository" without initializing it with a README.2. Initialize Git in Your Project:Open your terminal in the project folder and run:git init
3. Add and Commit Your Files:This command adds all files (except those in .gitignore) and saves them in the repository's history.git add .
git commit -m "Initial commit: a working Flask API for gas stations"
4. Link Your Local Repository to GitHub:Copy the repository URL from your GitHub page. It will look something like https://github.com/your-username/gas-station-backend.git. Then run the following commands, replacing the URL with your own.git branch -M main
git remote add origin [https://github.com/your-username/gas-station-backend.git](https://github.com/your-username/gas-station-backend.git)
5. Push Your Code:This uploads your committed files to GitHub.git push -u origin main
Your code is now on GitHub!
=======
# Gas-Station
A simple backend API for a gas station finder application, built with Python, Flask, and SQLite. Provides CRUD operations and a 'find nearby' feature
>>>>>>> ad77e6742a42c95663d1136fbfa186fd17bd8841
