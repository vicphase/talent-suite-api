const swaggerJSDoc = require('swagger-jsdoc');

module.exports = function(app) {
  const swaggerDefinition = {
    info: {
      title: 'Talent Suite API',
      version: '0.0.0',
      description: 'Documentation to communicate with the Talent Suite API'
    },
    host: 'localhost:3000',
    basePath: '/'
  };
  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./**/routes/*.js', 'routes.js'] // pass all in array
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
