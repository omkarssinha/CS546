const axios= require('axios');
//const mongoCollections = require('../config/mongoCollections');
//const shows = mongoCollections.shows;
//const uuid = require('uuid');

let exportedMethods = {
  async getAllShows() {
    const {data} = await axios.get("http://api.tvmaze.com/shows");
    return data;
    //return "hello";
  },
  async getShowById(id) {

    //console.log(id);
    //const postCollection = await posts();
    let url= "http://api.tvmaze.com/shows/";
    url = url+id;
    //console.log(url);
    const {data} = await axios.get(url) ;
    //console.log(data);
    
    if (!data) throw 'Show for this id not found';
    return {data};
  },

 
};

module.exports = exportedMethods;