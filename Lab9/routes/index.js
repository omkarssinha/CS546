const homepageRoutes = require('./homepage');

const constructorMethod = (app) => {

 /* app.use('/shows/##', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });*/
  app.use('/', homepageRoutes);
    
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;