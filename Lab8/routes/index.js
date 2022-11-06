const showRoutes = require('./shows');
const searchRoutes = require('./search');
const homepageRoutes = require('./homepage');

const constructorMethod = (app) => {

 /* app.use('/shows/##', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });*/
  app.use('/', homepageRoutes);

  app.use('/shows', showRoutes);
  
  app.use('/search', searchRoutes);
    
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;