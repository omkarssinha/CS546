const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const myData = {
        "name": "Omkar Sinha",
        "cwid": "10468312",
        "biography": "My name is omkar and I am a student at Stevens.\n I currently in first sem.",
        "favoriteShows": ["Under the Dome", "CBS", "Bitten" ]
    }
    //console.log(myData);
    //console.log(myData.biography);
    res.json(myData);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;