let myBtn = document.getElementById('myBtn')
let myForm = document.getElementById("myForm")
// let myDivBtn = document.getElementById("divBtn")
// let divContainer = document.getElementById("container")
let results = document.getElementById("results")
let myError1= document.getElementById("error1")
let myError2= document.getElementById("error2")
let myError3= document.getElementById("error3")

if (myForm) {
myForm.addEventListener('submit', (event) => {
event.preventDefault();
let li = document.createElement('li');

let num = myForm.EnterNo.value;
if(num=="")
myError1.hidden=false;
else if(num<0)
myError2.hidden=false;
else if(num%1!=0)
myError3.hidden=false;
else
{
    myError1.hidden=true;
    myError2.hidden=true;
    myError3.hidden=true;
    num = parseInt(num);
    let fibo= Fibonacci(num);
    li.innerHTML="The fibonacci of "+num+" is "+fibo;
    results.appendChild(li);
    //setTimeout(3000);
    if(prime(fibo))
    {
        li.className="is-prime";
    }
    else
    {
        li.className="non-prime";
    }
}
}
)
}


/*async function calcFibonacci(num)
{
   let sum= Fibonacci(num-1)+Fibonacci(num-2);
   return sum;
}/*
function Fibonacci1(n)
{
    var fibo= new Array(n);
    for(let i=0;i<n;i++)
    {
        fibo[i]=i;
       // fibo.push(i);
    }
    n=n+2+fibo[1];
    return n;
}
*/
function Fibonacci(num)
{
    if(num<1)
    return 0;
    var fibo= new Array(num+2);
    fibo[0]=0;
    fibo[1]=1;
    //console.log(num);
    for(let i=2;i<=num;i++)
    {
        fibo[i] = fibo[i-1]+fibo[i-2];
    }
    //li.innerHTML=fibo[num];//await Fibonacci(num);
    //results.appendChild(li);
    return fibo[num];
}
function prime(n)
{
    if(n==2)
    return true;
    if(n==1 || n==0)
    return false;
    for(let i=2; i<n/2 +1; i++)
    {
        if(n%i==0)
        {
            return false;
        }
    }
    return true;
}