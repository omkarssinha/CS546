console.log("Hello World");

arr=[10,2,3];

myObj = {};
//arr1 =[]
for(let i of arr){
    let k=0;
    for(let j=2;j<i;j++)
    {
        if(i%j==0)
        k++;
    }
    num = String(i);
    //console.log(num);
    if(k==0)
    {myObj[num]= true;
    //console.log(myObj[num]);
    }
    else
    {myObj[num]= false; 
     //console.log(myObj[num]);
    }
}
console.log(myObj);