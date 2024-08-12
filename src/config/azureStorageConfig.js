const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=imagenes224;AccountKey=uaxwFg318S3NhZOqptbwWdWRxRMPP5b5cVKqXSqLM4di6TXXBuMFPGMTWVXurNITzxtqCpP1VYDZ+AStNRpdyw==;EndpointSuffix=core.windows.net';
const CONTAINER_NAME = 'imagenes224';

async function createContainerClient() {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

        // Verifica si el contenedor existe
        const exists = await containerClient.exists();
        if (!exists) {
            await containerClient.create();
        }

        return containerClient;
    } catch (error) {
        console.error('Error connecting to Azure Blob Storage:', error.message);
        throw error; // Opcional: Lanza el error si deseas manejarlo más arriba
    }
}

module.exports = createContainerClient;
