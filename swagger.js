const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This API is intended for a assignment in CSE 341 to learn how to use Swagger for API Documentation.',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'], 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);