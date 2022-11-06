const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {title: "Show Finder"});
    //console.log("Hi");
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;