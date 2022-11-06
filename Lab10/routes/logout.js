const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    req.session.destroy();
    res.render("logout", {title: "Logged out"});
  });

  module.exports = router;
  
