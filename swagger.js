const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'REST API',
    description: 'REST API with Express and Firestore',
    version: '1.0.0'
  },
  host: 'restapis-ejym.onrender.com',  
  schemes: [
    'https'
  ],
  basePath: "/api",
 securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            requiere: true,
            description: "Please enter your JWT with Bearer <token> format"
        }
    },
    security: [{ Bearer: [] }],
   
    paths: {}
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

