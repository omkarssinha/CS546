const axios= require('axios');

async function getPersonById(id)
{
    try{
        await isNumber(id);
    } catch(e){
        return e;
    }
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
    let val =id;
    

    for(let i=0;i<data.length;i++)
    {
        if(data[i].id == val)
        return data[i];
    }
    throw "Id parameter is out of bounds";
}

async function howManyPerState(stateAbbrv)
{
    try{
        await isString(stateAbbrv);
    } catch(e){
        return e;
    }

    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
    let val =stateAbbrv.trim();
    let count=0;

    for(let i=0;i<data.length;i++)
    {
        if(data[i].address.state === val || data[i].address.state===val.toUpperCase() || data[i].address.state.toUpperCase()===val.toUpperCase() )
        count++;
    }
    if(count===0)throw "There is no people living in this state"
    else
    return count;
}

async function personByAge(index)
{
    try{
        await isNumber(index);
    } catch(e){
        return e;
    }
    
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
    let val =index;
    returnObj={}

    //data.sort(function(a, b){return a-b});
    
    await data.sort(function(x,y)
    {
        date1= x.date_of_birth;
        date2= y.date_of_birth;
        b = new Date(date1);
        a = new Date(date2);
        if((b.getYear()-a.getYear())>0)
        return 1;
        else if(b.getYear()-a.getYear()==0)
        {
            if(b.getMonth()-a.getMonth()>0)
            return 1;
            else if(b.getMonth()-a.getMonth()==0)
            {
                if(b.getDate()-a.getDate()>=0)
                return 1;
                else
                return -1;
            }
            else
            return -1;
        }
        else
        return -1;
    
     });
     


    for(let i=0;i<data.length;i++)
    {

        if(data[i].id === val)
        {
            returnObj.first_name= data[i].first_name;
            returnObj.last_name= data[i].last_name;
            returnObj.date_of_birth=data[i].date_of_birth;
            dob=data[i].date_of_birth;
            let age = (dob) =>{
                a= new Date(dob);
                b = new Date();
                if((b.getMonth()-a.getMonth())>0)
                return (b.getYear()-a.getYear());
                else if(b.getMonth()-a.getMonth()==0)
                {
                    if(b.getDate()-a.getDate()>0)
                    return (b.getYear()-a.getYear());
                    else
                    return (b.getYear()-a.getYear()-1);
                }
                else
                return (b.getYear()-a.getYear()-1);
            }
            returnObj.age =age(dob);

            return returnObj;
        }
    }
    throw "Id parameter is out of bounds";
}


async function peopleMetrics()
{
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
    let resultObj =    {
        totalLetters: 0,		
        totalVowels: 0,	
        totalConsonants: 0,
        longestName: data[0].first_name + " "	+ data[0].last_name,
        shortestName: data[0].first_name + " "	+ data[0].last_name,
        mostRepeatingCity: data[0].address.city,
        averageAge:	0
    };
    let cityList={};
    let total=0;
    for(let i=0;i<data.length;i++)
    {
        fullname = data[i].first_name+" "+data[i].last_name;
        for(let j of fullname)
        {
            consonantsList = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
            vowelList = ['a','e','i','o','u','A','E','I','O','U'];
            if(consonantsList.includes(j)==true)
            {
                resultObj.totalConsonants++;
                resultObj.totalLetters++;
            }
            if(vowelList.includes(j)==true)
            {
                resultObj.totalVowels++;
                resultObj.totalLetters++;
            }
        }
        if(fullname.length>resultObj.longestName.length)
        resultObj.longestName= fullname;
        if(fullname.length<resultObj.shortestName.length)
        resultObj.shortestName= fullname;

        let dob=data[i].date_of_birth;
        let age = (dob) =>{
            a= new Date(dob);
            b = new Date();
            if((b.getMonth()-a.getMonth())>0)
            return (b.getYear()-a.getYear());
            else if(b.getMonth()-a.getMonth()==0)
            {
                if(b.getDate()-a.getDate()>=0)
                return (b.getYear()-a.getYear());
                else
                return (b.getYear()-a.getYear()-1);
            }
            else
            return (b.getYear()-a.getYear()-1);
        }
        //console.log(age(dob));
        total= total + age(dob);
        //console.log(age(returnObj.averageAge));
        city = data[i].address.city;
        if(cityList[city])
        cityList[city]++;
        else
        cityList[city]=1;
    }
    total = total/data.length;
    total =total*100;
    total = Math.round(total);

    resultObj.averageAge =total/100;

    //console.log(cityList);
    for(let j in cityList)
    {
        if(cityList[j]>cityList[resultObj.mostRepeatingCity])
        resultObj.mostRepeatingCity = j;

    }
    return resultObj;
    
}


 async function isNumber(num)
 {
     if(typeof(num)!='number') throw "Id parameter is not a number";
 }
 async function isString(num)
 {
     if(typeof(num)!='string') throw "Id parameter is not a string";
 }

 

module.exports={
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}