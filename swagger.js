const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'REST API',
    description: 'REST API with Express and Firestore',
    version: '1.0.0'
  },
  host: 'restapis-ejym.onrender.com',  // Reemplaza <ID> con el ID real de tu servicio en Render
  schemes: [
    'https'
  ],
  basePath: "/api",
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
