const axios= require('axios');

module.exports = {

    async getShow(id)
    {
        //console.log("Let's try");
        if(id =="")throw "Empty input";
        let url ="http://api.tvmaze.com/shows/";
        url = url + id;
        //console.log(url);
        let data2 ={};
        data2 = await axios.get(url);
        return data2.data;
    }

}