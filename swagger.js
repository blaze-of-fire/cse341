const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Animals and Furniture API',
        description: 'This API is intended to give access to animal and furniture information from a database. Possible uses include a mobile app for a furniture store or an educational app about animals.',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'], 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);