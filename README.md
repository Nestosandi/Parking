Esta es una API RESTf diseñada para gestionar registros de vehículos en un parqueadero. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los registros de parqueadero.

## Requisitos

- Node.js instalado en tu máquina
- Gestor de paquetes npm (se instala automáticamente con Node.js)
- Base de datos MongoDB instalada y en funcionamiento (En este caso MongoDB ATLAS)

## Instalación

1. Clona este repositorio en tu máquina local:

2. Navega al directorio del proyecto


Para crear un nuevo registro de parqueadero, envía una solicitud POST a /api/v1/parkingrecords con los datos del vehículo en el cuerpo de la solicitud en formato JSON.

Para actualizar un registro de parqueadero (para registrar la hora de salida), envía una solicitud PUT a /api/v1/parkingrecords/:id con el ID del registro a actualizar y el dato exiTime actualizado en el cuerpo de la solicitud en formato JSON.

Para obtener todos los registros de parqueadero, envía una solicitud GET a /api/v1/parkingrecords.

Para eliminar un registro de parqueadero, envía una solicitud DELETE a /api/v1/parkingrecords/:id con el ID del registro a eliminar.
