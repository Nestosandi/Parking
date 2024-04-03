Este API permite gestionar registros de entrada y salida de vehículos en un parqueadero. Ofrece las siguientes funcionalidades:

## Requisitos

  1. Node.js: Framework para el desarrollo del API.
     
  2. Express.js: Framework para la creación de aplicaciones web con Node.js.
     
  3. Prisma: ORM para la interacción con la base de datos PostgreSQL.

## Funciones

  1. Crear un nuevo registro de parqueadero:
     Se valida el tipo de vehículo y se verifica si hay cupos disponibles.
     Se registra la información del vehículo, incluyendo la hora de entrada.
     
  2. Actualizar un registro de parqueadero:
     Se actualiza la hora de salida del vehículo.
     
  3. Obtener todos los registros de parqueadero:
     Se puede obtener una lista de todos los registros, con información como el tipo de vehículo, la placa y las horas de entrada y salida.
     
  4. Eliminar un registro de parqueadero:
     Se elimina un registro específico del sistema.

## Endpoints y Rutas

  1. /api/v1/parkingrecords	POST	Crea un nuevo registro de parqueadero.
  2. /api/v1/parkingrecords/:id	PUT	Actualiza la hora de salida de un registro de parqueadero.
  3. /api/v1/parkingrecords	GET	Obtiene todos los registros de parqueadero.
  4. /api/v1/parkingrecords/:id	DELETE	Elimina un registro de parqueadero.

## Ejemplo JSON
POST /api/v1/parkingrecords
{
  "id":"1",
  "type": "car",
  "license": "ABC123",
  "model": "Toyota Corolla",
  "year": 2020,
  "entryTime": "2023-11-14T10:00:00.000Z"
  "exitTime": null
}

