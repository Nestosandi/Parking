# Parking Lot API

This is a REST API designed to manage vehicle records in a parking lot. It allows performing CRUD operations (Create, Read, Update, Delete) on parking lot records.

## Requirements

1. **Node.js:** JavaScript runtime for server-side development.
2. **Express.js:** Web application framework for Node.js.
3. **Prisma:** ORM for database interaction with MongoDB Atlas.

## Features

1. **Create a New Parking Record:**
   - Validates the vehicle type and checks if there are available slots.
   - Registers vehicle information, including entry time.

2. **Update a Parking Record:**
   - Updates the vehicle's exit time.

3. **Get All Parking Records:**
   - Retrieves a list of all records with information such as vehicle type, license plate, and entry and exit times.

4. **Delete a Parking Record:**
   - Deletes a specific record from the system.

## Endpoints and Routes

1. **POST /api/v1/parkingrecords:** Creates a new parking record.
2. **PUT /api/v1/parkingrecords/:id:** Updates the exit time of a parking record.
3. **GET /api/v1/parkingrecords:** Retrieves all parking records.
4. **DELETE /api/v1/parkingrecords/:id:** Deletes a parking record.

## Example JSON

### POST /api/v1/parkingrecords
```json
{
  "id": "1",
  "type": "car",
  "license": "ABC123",
  "model": "Toyota Corolla",
  "year": 2020,
  "entryTime": "2023-11-14T10:00:00.000Z",
  "exitTime": null
}
```

## Code Overview

### Server Setup
The server is set up using Express.js and Prisma ORM. It listens on port 3000 or a port specified in the environment variables.

### Create Parking Record Endpoint
The endpoint `/api/v1/parkingrecords` is used to create a new parking record. It validates the type of vehicle and checks if the parking lot has available slots before creating a new record.

### Update Parking Record Endpoint
The endpoint `/api/v1/parkingrecords/:id` is used to update the exit time of a parking record.

### Get All Parking Records Endpoint
The endpoint `/api/v1/parkingrecords` is used to retrieve all parking records from the database.

### Delete Parking Record Endpoint
The endpoint `/api/v1/parkingrecords/:id` is used to delete a specific parking record from the database.

## How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nestosandi/Parking.git
   cd parking-lot-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Prisma:**
   Ensure you have a MongoDB Atlas database set up and configure Prisma to connect to your database.

4. **Run the server:**
   ```bash
   npm start
   ```

## Contact

For any inquiries or issues, please contact:
- **Email:** ernest.drv@gmail.com
- **GitHub:** [yourusername](https://github.com/nestosandi)

---

Feel free to customize the content further to better match your project's details and personal preferences.