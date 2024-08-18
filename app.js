const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

const app = express();

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', require('./routes/api'));

module.exports = app;  // Exporta la aplicación Express