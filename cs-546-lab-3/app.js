//const axios= require('axios');
const people= require('./people.js');
const work= require('./work.js');

//const work= require('./work.js');

async function main()
{    /*
    try{//should pass
        console.log(await people.getPersonById(101));
    }catch(e){
        console.log(e);
    }
    try{// should fail
        console.log(await people.getPersonById("foo"));
    }catch(e){
        console.log(e);
    }
    

    try{//should pass
        console.log(await people.howManyPerState("NY"));
    }catch(e){
        console.log(e);
    }
    try{// should fail
        console.log(await people.howManyPerState());
    }catch(e){
        console.log(e);
    }
    
    try{//should pass
        console.log(await people.personByAge(338));
    }catch(e){
        console.log(e);
    }
    try{// should fail
        console.log(await people.personByAge("foo"));
    }catch(e){
        console.log(e);
    }
    /*
    try{//should pass
        console.log(await people.peopleMetrics());
    }catch(e){
        console.log(e);
    }
    
    try{//should pass
        console.log(await work.listEmployees());
    }catch(e){
        console.log(e);
    }

    try{//should pass
        console.log(await work.fourOneOne('240-144-7553'));
    }catch(e){
        console.log(e);
    }
    try{// should fail
        console.log(await work.fourOneOne('212-208-8374'));
    }catch(e){
        console.log(e);
    }*/

    try{//should pass
        console.log(await work.whereDoTheyWork("531-32-0882"));
    }catch(e){
        console.log(e);
    }
    try{// should fail
        console.log(await work.whereDoTheyWork());
    }catch(e){
        console.log(e);
    }
}

main();