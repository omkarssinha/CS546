const axios= require('axios');

module.exports = {

    async searchForTerm(term)
    {
        //console.log(term);
        if(term =="")throw "Empty input";
        let url ="http://api.tvmaze.com/search/shows?q=";
        url = url + term;
        const {data} = await axios.get(url);

        let data1=[];
        let j =0;
        for( let i of data)
        {
            //console.log(i);
            if(j<20)
            {
                let obj ={};
                obj.name=i.show.name;
                //console.log(i.name);
                obj.id = i.show.id;
                data1.push(obj);
                //console.log(j);
                j++;
            }
            else{
            //console.log("hi from else");
            break;}
        }
        return data1;
    }

}