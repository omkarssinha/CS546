const showRoutes = require('./shows');
const aboutme = require('./aboutme');

const constructorMethod = (app) => {

 /* app.use('/shows/##', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });*/

  app.use('/shows', showRoutes);
  
  app.use('/aboutme', aboutme);
    
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found!!' });
  });
};

module.exports = constructorMethod;