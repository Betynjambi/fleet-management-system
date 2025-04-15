# Fleet & Asset Management System

A simple backend system for managing vehicles, maintenance records, and battery tracking. Built using Node.js and PostgreSQL.

## Features
- Vehicle CRUD (Create, Read, Update, Delete)
- Maintenance tracking
- Battery monitoring (basic simulation)
- REST API with Express

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Docker (later)

## API Overview
### Vehicles
### Method	Endpoint	Description
- GET	/api/vehicles	List all vehicles (supports pagination)
- GET	/api/vehicles/:id	Get vehicle by ID (with maintenance)
- GET	/api/vehicles/count	Total number of vehicles
- GET	/api/vehicles?status=...	Filter vehicles by status
- POST	/api/vehicles	Create new vehicle
- PUT	/api/vehicles/:id	Update vehicle
- DELETE	/api/vehicles/:id	Delete vehicle
### Maintenance
### Method	Endpoint	Description
- POST	/api/maintenance	Log a maintenance record
- GET	/api/maintenance/:vehicleId	Get maintenance records for vehicle

## Future Work
- Unit & integration testing with Jest
- Dockerized local and production environments
- Swagger/OpenAPI docs for all endpoints
- CI/CD deployment via GitHub Actions

