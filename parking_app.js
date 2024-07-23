// API Rest to manage a parking lot
const express = require('express');
// Prisma ORM is used to interact with the database.
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Created an Endpoint to manage the new records
app.post("/api/v1/parkingrecords", async (req, res) => {
    const { id,type, license, model, year, entryTime, exitTime } = req.body;

    try {
        // Verify the number of records of type car and motorcycle that have not left the parking lot.
        const carsCount = await prisma.parkingrecord.count({
            where: {
                type: 'car',
                exitTime: null
            }
        });

        const motorcyclesCount = await prisma.parkingrecord.count({
            where: {
                type: 'moto',
                exitTime: null
            }
        });

        // Verify if the limit of cars (5) or motorcycle (10) is reached
        if ((type === 'car' && carsCount >= 5) || (type === 'moto' && motorcyclesCount >= 10)) {
            return res.status(400).json({
                success: false,
                message: "The parking lot is full for this type of vehicle",
            });
        }

        // Create the new parking lot record if the limit has not been reached.
        const newRecord = await prisma.parkingrecord.create({
            data: {
                id: id,
                type: type,
                license: license,
                model: model,
                year: year,
                entryTime: entryTime,
                exitTime: exitTime
            },
        });

        res.status(201).json({
            success: true,
            message: "Record created successfully",
            data: newRecord
        });
    } catch (error) {
        console.error("Error creating a new record", error);
        res.status(500).send("Internal error server");
    }
});


// Endpoint to update parking records, in this case the exit time
app.put("/api/v1/parkingrecords/:id", async (req, res) => {
    const id = req.params.id;
    const { exitTime } = req.body;

    try {
        // Verify if the parking record exists
        const record = await prisma.parkingrecord.findUnique({
            where: {
                id: id
            }
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found",
            });
        }

        // Updated the parking record with the exit time
        const updatedRecord = await prisma.parkingrecord.update({
            where: {
                id: id
            },
            data: {
                exitTime: exitTime
            },
        });

        res.status(200).json({
            success: true,
            message: "Parking record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        console.error("Error updating the parking record", error);
        res.status(500).send("Internal Error Server");
    }
});

// Endpoint to get all parking records
app.get("/api/v1/parkingrecords", async (req, res) => {
    try {
        // Get all parking records
        const records = await prisma.parkingrecord.findMany();

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        console.error("Error getting the parking records", error);
        res.status(500).send("Internal Error Server");
    }
});

// Endpoint to delete parking records
app.delete("/api/v1/parkingrecords/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Verify if the parking record exists
        const record = await prisma.parkingrecord.findUnique({
            where: {
                id: id
            }
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Parking Record not found",
            });
        }

        // Borrar el registro de parqueadero
        await prisma.parkingrecord.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            success: true,
            message: "Parking record deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting the parking recor", error);
        res.status(500).send("Internal Error Server");
    }
});


const PORT = process.env.PORT || 3000;

// Starts the server
app.listen(PORT, () => {
    console.log(`Express Server working on port ${PORT}`);
});
