const swaggerAutogen = require('swagger-autogen')();

const doc={
    info: {
        title: 'user api',
        description: 'users api'
    },
    ifo: {
        title: 'contacts api',
        description: 'contacts api'
    },
    host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile= './swagger.json';
const endpointsFiles=['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);