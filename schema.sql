<<<<<<< HEAD
-- schema.sql
-- This file defines the structure of the database.

-- Drop the table if it already exists to ensure a clean setup
DROP TABLE IF EXISTS gas_stations;

-- Create the main table for gas stations
CREATE TABLE gas_stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL DEFAULT 0.0,
    longitude REAL DEFAULT 0.0,
    price_kg REAL NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Open', 'Closed', 'Low Stock')) DEFAULT 'Closed',
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- You can add more tables here later, like the 'messages' table for chat.
=======
-- schema.sql
-- This file defines the structure of the database.

-- Drop the table if it already exists to ensure a clean setup
DROP TABLE IF EXISTS gas_stations;

-- Create the main table for gas stations
CREATE TABLE gas_stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL DEFAULT 0.0,
    longitude REAL DEFAULT 0.0,
    price_kg REAL NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Open', 'Closed', 'Low Stock')) DEFAULT 'Closed',
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- You can add more tables here later, like the 'messages' table for chat.
>>>>>>> 617270bc5430eb293a4dae146ff16e87ac21c67c
