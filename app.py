import sqlite3
import os
import math
from flask import Flask, jsonify, request, g
from flask_cors import CORS

# --- Configuration ---
DATABASE = 'gas_stations.db'

# --- App Initialization ---
app = Flask(__name__)
# Enable CORS to allow the frontend to make requests from a different origin
CORS(app) 

# --- Database Helper Functions ---

def get_db():
    """
    Opens a new database connection if there is none yet for the
    current application context.
    """
    if 'db' not in g:
        g.db = sqlite3.connect(
            DATABASE,
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        # This allows us to access columns by name (like a dictionary)
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(e=None):
    """
    Closes the database again at the end of the request.
    This function is automatically called by Flask.
    """
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    """
    Initializes the database by creating the necessary tables.
    This function should be called once when the application starts.
    """
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
    print("Database has been initialized.")

# --- Helper to convert station row to dictionary ---
def station_to_dict(station_row):
    """Converts a sqlite3.Row object into a dictionary."""
    if station_row is None:
        return None
    return dict(station_row)
    
# --- Geolocation Helper Function ---

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance between two points 
    on the earth (specified in decimal degrees).
    Result is returned in kilometers.
    """
    # Earth radius in kilometers
    R = 6371.0
    
    # Convert decimal degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    # Haversine formula
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c
    return distance

# --- API Routes (Endpoints) ---

@app.route('/api/stations', methods=['GET'])
def get_stations():
    """
    GET all gas stations.
    Supports filtering by `status` as a query parameter.
    Example: /api/stations?status=Open
    """
    db = get_db()
    cursor = db.cursor()
    
    # Base query
    query = "SELECT * FROM gas_stations"
    params = []

    # Filtering logic
    status_filter = request.args.get('status')
    if status_filter:
        query += " WHERE status = ?"
        params.append(status_filter)

    stations_rows = cursor.execute(query, params).fetchall()
    
    # Convert list of Row objects to list of dictionaries
    stations_list = [station_to_dict(row) for row in stations_rows]
    
    return jsonify(stations_list), 200
    
@app.route('/api/stations/nearby', methods=['GET'])
def get_nearby_stations():
    """
    GET nearby gas stations based on user's location.
    Requires `lat`, `lon`, and `radius` query parameters.
    Example: /api/stations/nearby?lat=6.5244&lon=3.3792&radius=5
    """
    user_lat = request.args.get('lat')
    user_lon = request.args.get('lon')
    radius = request.args.get('radius')

    if not all([user_lat, user_lon, radius]):
        return jsonify({"error": "Missing required query parameters: lat, lon, radius"}), 400

    try:
        user_lat = float(user_lat)
        user_lon = float(user_lon)
        radius = float(radius)
    except ValueError:
        return jsonify({"error": "Invalid location or radius values. Must be numbers."}), 400

    db = get_db()
    all_stations_rows = db.execute('SELECT * FROM gas_stations').fetchall()
    
    nearby_stations = []
    for station_row in all_stations_rows:
        station = station_to_dict(station_row)
        dist = haversine(user_lat, user_lon, station['latitude'], station['longitude'])
        
        if dist <= radius:
            # Optionally add the distance to the returned object
            station['distance_km'] = round(dist, 2)
            nearby_stations.append(station)
            
    # Sort stations by distance, closest first
    sorted_stations = sorted(nearby_stations, key=lambda s: s['distance_km'])

    return jsonify(sorted_stations), 200


@app.route('/api/stations/<int:station_id>', methods=['GET'])
def get_station(station_id):
    """GET a single gas station by its ID."""
    db = get_db()
    station = db.execute(
        'SELECT * FROM gas_stations WHERE id = ?', (station_id,)
    ).fetchone()
    
    if station is None:
        return jsonify({"error": "Gas station not found"}), 404
        
    return jsonify(station_to_dict(station)), 200

@app.route('/api/stations', methods=['POST'])
def create_station():
    """
    CREATE a new gas station.
    Expects a JSON body with name, address, price_kg, etc.
    """
    data = request.get_json()
    
    # Basic validation
    if not data or not 'name' in data or not 'address' in data or 'price_kg' not in data:
        return jsonify({"error": "Missing required fields: name, address, price_kg"}), 400

    name = data['name']
    address = data['address']
    price_kg = data['price_kg']
    # Optional fields with defaults
    latitude = data.get('latitude', 0.0)
    longitude = data.get('longitude', 0.0)
    status = data.get('status', 'Closed') # Default to 'Closed'

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute(
            'INSERT INTO gas_stations (name, address, latitude, longitude, price_kg, status) VALUES (?, ?, ?, ?, ?, ?)',
            (name, address, latitude, longitude, price_kg, status)
        )
        db.commit()
        new_station_id = cursor.lastrowid
        
        # Fetch the newly created station to return it in the response
        new_station = db.execute('SELECT * FROM gas_stations WHERE id = ?', (new_station_id,)).fetchone()
        
        return jsonify(station_to_dict(new_station)), 201 # 201 Created
    except sqlite3.IntegrityError:
        return jsonify({"error": "An error occurred while creating the station."}), 500


@app.route('/api/stations/<int:station_id>', methods=['PUT'])
def update_station(station_id):
    """
    UPDATE an existing gas station by ID.
    Expects a JSON body with the fields to update.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data provided"}), 400

    db = get_db()
    
    # Check if station exists first
    station = db.execute('SELECT * FROM gas_stations WHERE id = ?', (station_id,)).fetchone()
    if station is None:
        return jsonify({"error": "Gas station not found"}), 404
        
    # Build the SET part of the SQL query dynamically
    update_fields = []
    params = []
    for key, value in data.items():
        # Make sure we only try to update valid columns
        if key in ['name', 'address', 'latitude', 'longitude', 'price_kg', 'status']:
            update_fields.append(f"{key} = ?")
            params.append(value)
    
    if not update_fields:
        return jsonify({"error": "No valid fields to update"}), 400

    params.append(station_id) # Add the station_id for the WHERE clause
    
    query = f"UPDATE gas_stations SET {', '.join(update_fields)} WHERE id = ?"
    
    db.execute(query, tuple(params))
    db.commit()
    
    # Fetch and return the updated station
    updated_station = db.execute('SELECT * FROM gas_stations WHERE id = ?', (station_id,)).fetchone()
    
    return jsonify(station_to_dict(updated_station)), 200


@app.route('/api/stations/<int:station_id>', methods=['DELETE'])
def delete_station(station_id):
    """DELETE a gas station by ID."""
    db = get_db()
    
    # Check if station exists first to provide a better response
    station = db.execute('SELECT * FROM gas_stations WHERE id = ?', (station_id,)).fetchone()
    if station is None:
        return jsonify({"error": "Gas station not found"}), 404

    db.execute('DELETE FROM gas_stations WHERE id = ?', (station_id,))
    db.commit()
    
    return jsonify({"message": "Gas station deleted successfully"}), 200


# --- Main execution block ---
if __name__ == '__main__':
    # Initialize the DB if it doesn't exist when the app starts
    with app.app_context():
        if not os.path.exists(DATABASE):
            init_db()
            print(f"'{DATABASE}' created.")
        else:
            print(f"'{DATABASE}' already exists.")
            
    # Run the Flask app
    # host='0.0.0.0' makes it accessible from any device on your network
    app.run(debug=True, host='0.0.0.0', port=5000)

