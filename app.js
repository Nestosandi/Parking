const express = require('express');
// Se utiliza Prisma ORM para interactuar con la base de datos
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para crear registros de parqueadero
app.post("/api/v1/parkingrecords", async (req, res) => {
    const { id,type, license, model, year, entryTime, exitTime } = req.body;

    try {
        // Verificar el número de registros de tipo carro y moto que no han salido del parqueadero
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

        // Verificar si se ha alcanzado el límite de carros (5) o motos (10)
        if ((type === 'car' && carsCount >= 5) || (type === 'moto' && motorcyclesCount >= 10)) {
            return res.status(400).json({
                success: false,
                message: "El parqueadero está lleno para este tipo de vehículo",
            });
        }

        // Crear el nuevo registro de parqueadero si no se ha alcanzado el límite
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
            message: "Registro de parqueadero creado exitosamente",
            data: newRecord
        });
    } catch (error) {
        console.error("Error creando el registro de parqueadero", error);
        res.status(500).send("Error interno del servidor");
    }
});


// Endpoint para actualizar registros de parqueadero, en este caso la hora de salida
app.put("/api/v1/parkingrecords/:id", async (req, res) => {
    const id = req.params.id;
    const { exitTime } = req.body;

    try {
        // Verificar si el registro de parqueadero existe
        const record = await prisma.parkingrecord.findUnique({
            where: {
                id: id
            }
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Registro de parqueadero no encontrado",
            });
        }

        // Actualizar el registro de parqueadero con la hora de salida
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
            message: "Registro de parqueadero actualizado exitosamente",
            data: updatedRecord
        });
    } catch (error) {
        console.error("Error actualizando el registro de parqueadero", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Endpoint para obtener todos los registros de parqueadero
app.get("/api/v1/parkingrecords", async (req, res) => {
    try {
        // Obtener todos los registros de parqueadero
        const records = await prisma.parkingrecord.findMany();

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        console.error("Error obteniendo los registros de parqueadero", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Endpoint para borrar registros de parqueadero
app.delete("/api/v1/parkingrecords/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Verificar si el registro de parqueadero existe
        const record = await prisma.parkingrecord.findUnique({
            where: {
                id: id
            }
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Registro de parqueadero no encontrado",
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
            message: "Registro de parqueadero eliminado exitosamente",
        });
    } catch (error) {
        console.error("Error eliminando el registro de parqueadero", error);
        res.status(500).send("Error interno del servidor");
    }
});


const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
