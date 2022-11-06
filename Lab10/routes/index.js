const loginRoutes = require('./login');
const privateRoutes = require('./private');
const logoutRoutes = require('./logout');
const homepageRoutes = require('./homepage');

const constructorMethod = (app) => {

     app.use('/', homepageRoutes);
   
     app.use('/login', loginRoutes);
     
     app.use('/private', privateRoutes);

     app.use('/logout', logoutRoutes);
       
     app.use('*', (req, res) => {
       res.status(404).json({ error: 'Not found' });
     });
   };
   
   module.exports = constructorMethod;