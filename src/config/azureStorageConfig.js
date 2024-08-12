const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=imagenes224;AccountKey=uaxwFg318S3NhZOqptbwWdWRxRMPP5b5cVKqXSqLM4di6TXXBuMFPGMTWVXurNITzxtqCpP1VYDZ+AStNRpdyw==;EndpointSuffix=core.windows.net';
const CONTAINER_NAME = 'imagenes224';

let containerClient;

try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
} catch (error) {
    console.error('Error connecting to Azure Blob Storage:', error.message);
    // Manejo del error, por ejemplo, lanzar un error, enviar una respuesta HTTP 500, etc.
}

module.exports = containerClient;
