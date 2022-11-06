const express = require('express');
const router = express.Router();
const data = require("../data");
const searchData = data.search;

router.get('/', async (req, res) => {
    try {
      let searchTermTemp=req.query.searchTerm
      if(searchTermTemp.trim()=="") throw "Blank input error";
      else
      {
        shows= await searchData.searchForTerm(req.query.searchTerm);
        //console.log(Array.isArray(shows));
        res.render('showsFound', {title: "Shows Found", shows: shows, searchTerm: req.query.searchTerm});
      }
    } catch (e) 
      {
        if(e.toString()=="Blank input error")
        {
          //console.log("Howzatt");
          //res.status(400).send();
          res.status(400).render('showsFound', {title: e, error: e});
        }
        else
        res.status(404).send();
      }
  });
  
  module.exports = router;