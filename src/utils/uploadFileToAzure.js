const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

// Cadena de conexión de Azure Storage
const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=imagenes224;AccountKey=tu_clave_aqui;EndpointSuffix=core.windows.net';

// Nombre del contenedor en Azure Blob Storage
const CONTAINER_NAME = 'imagenes224';

async function uploadFile(filePath) {
    try {
        // Crear cliente de servicio Blob
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

        // Verificar si el contenedor existe, si no, crearlo
        const containerExists = await containerClient.exists();
        if (!containerExists) {
            await containerClient.create();
            console.log(`Contenedor ${CONTAINER_NAME} creado.`);
        }

        // Obtener nombre del archivo y crear un blob cliente
        const blobName = path.basename(filePath);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Leer archivo desde el sistema de archivos local
        const fileStream = fs.createReadStream(filePath);
        const fileSize = fs.statSync(filePath).size;

        // Subir el archivo a Azure Blob Storage
        await blockBlobClient.uploadStream(fileStream, fileSize);
        console.log(`Archivo subido exitosamente: ${blobName}`);
    } catch (error) {
        console.error('Error subiendo el archivo:', error.message);
    }
}

// Ruta del archivo que deseas subir
const localFilePath = path.join(__dirname, '../uploads/imgprueba.png');

// Ejecutar la función de subida
uploadFile(localFilePath);
