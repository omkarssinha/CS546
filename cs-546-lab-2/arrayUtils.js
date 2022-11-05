const mean = function mean(array)
{
    if(arguments.length==0)throw `Input value is null`;
    if(!Array.isArray(array))throw `Input value is not an Array`;
    if(array.length==0)throw `Input Array is empty`;
    //if(arguments.length>1)throw `Input has too many arguments`;

    let j=0 //counter
    for(let i of array)
    {
        j++;
        //console.log(i);
        if(typeof(i) != 'number')throw `Element no ${j} is not a number`;

    }
    let sum= 0;
    j=0;
    for(let i of array)
    {
        j=j+1;
        sum=sum+i;
    }

    return sum/j;
}

const medianSquared = function medianSquared(array)
{
    if(arguments.length==0)throw `Input value is null`;
    if(!Array.isArray(array))throw `Input value is not an Array`;
    if(array.length==0)throw `Input Array is empty`;
    //if(arguments.length>1)throw `Input has too many arguments`;

    let j=0 //counter
    for(let i of array)
    {
        j++;
        //console.log(i);
        if(typeof(i) != 'number')throw `Element no ${j} is not a number`;

    }
    array.sort(function(a, b){return a-b});
    
    if(array.length%2!=0)
    {
        let mid = (array.length+1)/2;
        //console.log(mid);
        let median= array[mid-1];
        //console.log(median);
        let medianSquare= Math.pow(median,2);
        return medianSquare;
    }
    else
    {
        let mid1 = (array.length)/2;
        let mid2 = (array.length)/2 +1;
        //console.log(mid1);
        let median = (array[mid1-1] + array[mid2-1])/2;
        let medianSquare= Math.pow(median,2);
        return medianSquare;
    }

}

const maxElement = function maxElement(array){

    if(arguments.length==0)throw `Input value is null`;
    if(!Array.isArray(array))throw `Input value is not an Array`;
    if(array.length==0)throw `Input Array is empty`;
    //if(arguments.length>1)throw `Input has too many arguments`;

    let j=0 //counter
    for(let i of array)
    {
        j++;
        //console.log(i);
        if(typeof(i) != 'number')throw `Element no ${j} is not a number`;

    }
    
    let maxNum = array[0];
    let index=0;

    for(let i=0;i<array.length;i++)
    {
        if(maxNum<array[i])
        {
            maxNum=array[i];
            index= i;
            //console.log(maxNum, index);
        }
    }    

    let result ={};
    result[maxNum]=index;

    return result;
}

const fill = function fill(end,value)
{
    if(arguments.length<1)throw `End parameter is null`;
    if(typeof(end) != 'number')throw `End parameter is not a number`;
    if(end<1)throw 'End is not positive integer greater than 0';
    if(end%1!=0)throw 'End is not an integer';

    let arr =new Array(end);
    if(arguments.length==2)
    {
        value= arguments[1];
        for(let i=0;i<end;i++)
        {
            arr[i] = value;
        }
    }
    else
    {
        for(let i=0;i<end;i++)
        {
            arr[i] = i;
        }
    }

    return arr;
}

const countRepeating = function countRepeating(array)
{
    if(arguments.length==0)throw `Input value is null`;
    if(!Array.isArray(array))throw `Input value is not an Array`;
    //if(arguments.length>1)throw `Input has too many arguments`;

    let result = {};
    if(array.length==0)
    return result;

    let j=0 //counter
    for(let i of array)
    {
        j++;
        //console.log(i);
        if(typeof(i) != 'number' && typeof(i) != 'string')throw `Element no ${j} is neither a number nor string`;

    }

    array.sort();
    //console.log(array);

    for(let i=0;i<array.length-1;i++)
    {
        if(array[i]==array[i+1])
        {
            element= array[i];
            if(typeof(result[element])=='undefined')
            result[element]=2;
            else
            result[element]++;
        }
                
    }
    return result;
}

const isEqual = function isEqual(arrayOne, arrayTwo)
{
    if(arguments.length==0)throw `Input value is null`;
    if(!Array.isArray(arrayOne))throw `Input value:arrayOne is not an Array`;
    //if(array.length==0)throw `Input Array is empty`;
    if(arguments.length==1)throw `Input has only one argument`;
    if(!Array.isArray(arrayTwo))throw `Input value:arrayTwo is not an Array`;

    if(arrayOne.length!=arrayTwo.length)
    { console.log("Hi");
        return false;}

    arrayOne.sort();
    //console.log('Array:'+arrayOne);
    arrayTwo.sort();
    //console.log('Array:'+arrayTwo);

    let j=0 //indicator
    for(let i=0;i<arrayOne.length;i++)
    {
        if(typeof(arrayOne[i])!='object')
        {
            if(arrayOne[i]===arrayTwo[i])
            j++;
        }
        else
        {
            if((typeof(arrayTwo[i]))!='object')
            return false;
            else if(arrayOne[i]==null)
            {
                if(arrayTwo[i]==null)
                j++;
                else{
                    console.log("Hello");
                return false;}
            }
            else if(arrayOne[i].length!=arrayTwo[i].length)
            {
                console.log("Morning");
            return false;
            }
            else
            {
                arrayOne[i].sort();
                arrayTwo[i].sort();

                let l= 0; //counter
                for(let k=0;k<arrayOne[i].length;k++ )
                {
                    if(arrayOne[i][k]===arrayTwo[i][k])
                    l++;
                    else{console.log("Bye");
                    return false;}
                }
                if(l===arrayOne[i].length)
                j++;
            }
        }
    }

    if(j==arrayOne.length)
    return true;
    else
    return false;
}



module.exports={
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}