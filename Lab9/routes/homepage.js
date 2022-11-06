const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('layouts/main', {});
    //console.log("Hi");
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;