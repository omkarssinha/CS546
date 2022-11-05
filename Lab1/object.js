const obj = {
5: "omkar",
2 :25,
}

//console.log(obj);

obj.a="Hi";

console.log(obj);

//const abc = 5;
//console.log(abc);
//abc =6;
//console.log(obj);

let obj11 = obj;

let j=0;
for(let i in obj11)
{
    console.log(obj[i]);
    if(obj[i])
    console.log("Its there");
    j++; 
}
//console.log(j);

if(obj["a"]);
else
console.log("Not there");




