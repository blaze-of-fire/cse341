const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Animals API',
        description: 'This API is intended to give access to animal information from a database.',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'], 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);