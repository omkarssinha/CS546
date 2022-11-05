const express = require('express');
const router = express.Router();
const data = require('../data');
const showData = data.shows;

router.get('/', async (req, res) => {

  try {
    const showList = await showData.getAllShows();
    //console.log(showList);
    res.json(showList);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {

  try {
      //console.log(req.params.id);
      if(req.params.id<0 || req.params.id%1!=0) throw "id error";
      const show = await showData.getShowById(req.params.id);
      //console.log(show);
      res.json(show);
  } catch (e) {
    //console.log(e);
    //res.json(e);
    if(e=="id error")
    {
      //console.log("Invalid ID")
      res.status(400).json("Invalid ID");
    }
    else{
      //console.log(e);
      res.status(404).json({ message: 'Show not found' });
  }
}
  
});

router.post('/', async (req, res) => {
  // Not implemented
  res.status(501).send();
});

router.delete('/', async (req, res) => {
  // Not implemented
  try {
    await showData.getShowById(req.params.id);
    } catch (e) {
    res.status(404).json({ error: 'Show not found' });
    return;
    }
    try {
    await showData.removeShow(req.params.id);
    res.sendStatus(200);
    } catch (e) {
    res.status(500).json({ error: e });
    }
  res.status(501).send();
});

module.exports = router;