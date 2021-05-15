const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'MEDICAL ADMIN BACKEND',
      version: '1.0.0',
      description: 'DOCUMENTATION FOR MEDICAL ADMIN BACKEND API',
    },
    host: 'localhost:3000',
    basePath: '/api',
    schemes:
      'http'
    ,
    servers : [{
      url : '/api',
      description: 'API Server',
    }],
  },
  apis: ['./rest/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}