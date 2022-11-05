const makeArrays = function makeArrays(array)
{
    if(arguments.length==0)throw `Input value is null`;
    if(!Array.isArray(array))throw `Input value is not an Array`;
    
    for(let i of array)
    {
        if(typeof(i)!='object')throw `Input Array has non-objects`;

        count=0; //count of elements
        for (let j in i)
        {
            count++;
        }
        if(count==0)throw 'Array has empty objects';
    }

    if(array.length<2)throw 'Array has less than 2 objects';

    let totalCount=0;
    for(let i of array)
    {
        for(let j in i)
        totalCount++;
    }
    //console.log(totalCount);
    let newArray = new Array(totalCount);

    let k=0;
    for(let i of array)
    {
        for(let j in i)
        {
            newArray[k] = new Array(2);
            newArray[k][0]= j;
            newArray[k][1]=i[j];
            k++;
        }
    }
    return newArray;   

}



const isDeepEqual = function isDeepEqual(obj1,obj2)
{
    if(arguments.length==0)throw `Input value is null`;
    if(typeof(obj1)!='object')throw `First parameter is not an object`;
    if(arguments.length<2)throw `Second parameter is missing`;
    if(typeof(obj2)!='object')throw `Second parameter is not an object`;

    let countObj1=0; //count of properties in obj1
    let countObj2=0; //count of properties in obj2

    for(let i in obj1)
    {
        countObj1++;
    }
    for(let i in obj2)
    {
        countObj2++;
    }
    if(countObj1!=countObj2){//console.log("Hello");
        return false;}
    
    for(let i in obj1)
    {
        if(obj2[i]);
        else{//console.log("Hi");
        return false;}

        if(typeof(obj1[i])!=typeof(obj2[i]))
        return false;
    }
    
    let result=true;
    let cnt=0;
    result = recursiveCheck(obj1,obj2,cnt);
    if(result==false){//console.log("bye");
    return false;}
    else
    return true;
}
function recursiveCheck(obj1,obj2,cnt1)
{
    cnt=cnt1;
    ++cnt;
    //console.log(cnt);
    for(let i in obj1)
    {
        if(typeof(obj1[i])!='object')
        {
            if(obj1[i]!=obj2[i]){//console.log("Howzzat");
            return false;}
        }
        else
        {
            let result=true;
            result = recursiveCheck(obj1[i],obj2[i],cnt);
            if(result==false)
            return false;
        }
    }
}



const computeObject = function computeObject(obj1, func)
{
    if(arguments.length==0)throw `Input value is null`;
    if(typeof(obj1)!='object')throw `First parameter is not an object`;

    let count=0; //count of element
    for(let i in obj1)
    {
        count++;
        if(typeof(obj1[i])!='number') throw "Input object has non-number values"
    }
    if(count<1) throw "Input object has less than 1 key value pair";
    if(typeof(func)!='function') throw "2nd parameter is not function";

    let newObj = obj1;
    for(let i in newObj)
    {
        newObj[i]=func(newObj[i]);
    }
   return newObj;
}

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}


/*
try{ //should pass
    console.log(isDeepEqual({a: 2, b: 4, c: 1}, {a: 2, b: 4, d: 1}));  //return true
    console.log("isDeepEqual successful");
}catch(e){
    console.log(e);
	console.log("isDeepEqual failed");
}

try{ //should fail
    console.log(isDeepEqual());  //throws error
    console.log("isDeepEqual successful");
}catch(e){
    console.log(e);
	console.log("isDeepEqual failed\n");
}
*/
