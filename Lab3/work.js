const axios= require('axios');

async function listEmployees()
{
    let data_people = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
    let data_work = await axios.get("https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json");
    //const data_work = JSON.parse(data_work1);
    let companyArray = [];

    for(let i=0;i<data_work.data.length;i++)
    {
        let employee=[];

        companyArray[i] ={
            company_name : data_work.data[i].company_name
        }
        for(let j of data_work.data[i].employees)
        {
            let empNo=0;
            for(let k=0; k<data_people.data.length;k++)
            {
                if(j==k)
                {
                    let employee1={
                        first_name : data_people.data[k-1].first_name,
                        last_name : data_people.data[k-1].last_name
                    }
                    //console.log(employee[empNo-1]);
                    employee.push(employee1);    
                }
                continue;
            }
        }
        //console.log("hello");
        //console.log(employee);
        companyArray[i].employees= employee; 
    }
    return companyArray;
}

async function fourOneOne(phoneNumber)
{
    if(arguments.length == 0) throw `Input value is null`;
    if(typeof(phoneNumber)!='string')throw "The input parameter in not string";
    if(!phoneNumber.length===12)throw "The format of phone number is wrong";

    let index=0;
    for(let i of phoneNumber)
    {
        numberList = ['0','1','2','3','4','5','6','7','8','9'];
        if(index===3 || index===7)
        {
            if(i!="-")throw "The format of phone number is wrong";
        }
        else
        {
            if(numberList.includes(i)==false)throw "The format of phone number is wrong";
        }
        index++;
    }
    const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json");
    for(let i=0;i<data.length;i++)
    {
        if(data[i].company_phone==phoneNumber)
        {
            let resultObj={
                company_name:data[i].company_name,
                company_address: data[i].company_address
            }
            return resultObj;
        }
    }
    throw "The phone number is not there in list";
}

async function whereDoTheyWork(ssn)
{
    if(arguments.length == 0) throw `Input value is null`;
    if(typeof(ssn)!='string')throw "The input parameter in not string";
    if(!ssn.length===11)throw "The format of ssn is wrong";

    let index=0;
    for(let i of ssn)
    {
        numberList = ['0','1','2','3','4','5','6','7','8','9'];
        if(index===3 || index===6)
        {
            if(i!="-")throw "The format of ssn is wrong";
        }
        else
        {
            if(numberList.includes(i)==false)throw "The format of ssn is wrong";
        }
        index++;
    }
    let fullname="";
    let id =0;
    let company_name = "";
    let indicator=0;
    
    let data_people = await axios.get("https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json");
    let data_work = await axios.get("https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json");
    
    for(let i=0;i<data_people.data.length;i++)
    {
        if(ssn===data_people.data[i].ssn)
        {
            fullname= data_people.data[i].first_name+" "+data_people.data[i].last_name;
            id= data_people.data[i].id;
            indicator++;
            break;
        }
    }
    if(indicator==0) throw "The ssn given is not found";

    indicator =0;
    for(let i=0;i<data_work.data.length;i++)
    {
        if(data_work.data[i].employees.includes(id)==true)
        {
            company_name=data_work.data[i].company_name;
            indicator++;
            return `${fullname} works at ${company_name}`;
        }
    }
    if(indicator==0) throw "The employee does not work in listed companies";
}



module.exports={
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}