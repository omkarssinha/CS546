const express = require('express');
const router = express.Router();
const data = require("../data");
const shows = require('../data/shows');
const showData = data.shows;

router.get('/:id', async (req, res) => {
    try {  
      let show= await showData.getShow(req.params.id);
      //console.log(show);
      let summary="";
      if(show.summary!=null)
      summary = show.summary.replace(/(<([^>]+)>)/ig, '');
      res.render('showsSelected', {title: show.name, image: show.image, language: show.language, genres: show.genres, rating: show.rating, network: show.network, summary: summary});
    } catch (e) {
      //console.log(e.toString());
      res.status(404).render('showsSelected', {title: "Invalid Input", error: e});
    }
  });
  
  module.exports = router;