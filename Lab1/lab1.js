const questionOne = function questionOne(arr = []) 
{    
    myObj = {};
    
    for(let i of arr)
    {      
        if(i<2 || i%1!=0)
        myObj[i]=false;

        else{
            let k=0;
            for(let j=2;j<i;j++)
            {
                if(i%j==0 )
                k++;
            }
            //console.log(num);
            if(k==0)
            {myObj[i]= true;
            //console.log(myObj[num]);
            }
            else
            {myObj[i]= false; 
             //console.log(myObj[num]);
            }
        }
    }
    return(myObj);
}

//console.log(questionOne([1, 2, 3])); 
// should return and output {'1': false, '2': true, '3': true}

const questionTwo = function questionTwo(arr = [])
{
    let sum = 0;
    for(let i of arr)
    {
        sum = sum + Math.pow(i,2);
    }
    sum = Math.pow(sum,5);
    sum = Math.sqrt(sum);
    sum = sum*100;
    sum = Math.round(sum);
    return sum/100;
}

//console.log(questionTwo([1,2,3])); 
// returns and outputs: 733.36 

const questionThree = function questionThree(text = "")
{
    str = {
        consonants: 0, 
        vowels: 0,
        numbers: 0,
        spaces: 0,
        punctuation: 0,
        specialCharacters: 0
    };

    consonantsList = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
    vowelList = ['a','e','i','o','u','A','E','I','O','U'];
    numberList = ['0','1','2','3','4','5','6','7','8','9'];
    punctuationList = ['.','?','!',',',';',':','-','{','}','(',')','[',']','\'','"'];

    for( let i of text)
    {
        if(consonantsList.includes(i)==true)
        {
            str.consonants++;
        }
        else if(vowelList.includes(i)==true)
        {
            str.vowels++;
        }
        else if(numberList.includes(i)==true)
        {
            str.numbers++;
        }
        else if(i==' ')
        {
            str.spaces++;
        }
        else if(punctuationList.includes(i)==true)
        {
            str.punctuation++;
        }
        else
        {
            str.specialCharacters++;
        }
    }
    return str;
}

// console.log(questionThree("The quick brown fox jumps over the lazy dog.")); 
// should return and output {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

const questionFour = function questionFour(num1=0, num2=0,num3=0)
{
    if((num1<=0)||(num2<=0)||(num3<=0))
    return 0;

    else
    {
        A= num1;
        num2=num2/100;
        n= num3*12;
        r = num2/12;

        r1 = r+1;
        D = Math.pow(r1,n)-1;
        D = D/r;
        D = D/(Math.pow(r1,n));

        P = A/D;

        P = P*100;
        P = Math.round(P);
        P = P/100;

        return P;    
    } 
}

// console.log(questionFour(25000, 3.11, 5)); 
// should return and output: 450.44
console.log(typeof questionFour);


module.exports = {
    firstName: "Omkar", 
    lastName: "Sinha", 
    studentId: "10468312",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
