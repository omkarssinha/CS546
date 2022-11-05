const camelCase = function camelCase(str) {
    if (arguments.length == 0) throw `Input value is null`;
    if (typeof (str) != 'string') throw `Input value is not a string`;
    if (str == "") throw "Empty string";
    if (str.trim() == "") throw "Whitespace only string";

    str = str.trim();
    let str1 = "";

    for (let i = 0; i < str.length; i++) {
        ch = str.charAt(i);
        ch = ch.toLowerCase();

        if (ch == " ")
            continue;

        else if (str.charAt(i - 1) == " ")
            str1 = str1 + ch.toUpperCase();

        else
            str1 = str1 + ch;
    }
    return str1;
}

const replaceChar = function replaceChar(str)
{
    if (arguments.length == 0) throw `Input value is null`;
    if (typeof (str) != 'string') throw `Input value is not a string`;
    if (str == "") throw "Empty string";
    if (str.trim() == "") throw "Whitespace only string";

    str= str.trim();

    let j = 0; //counter
    let firstChar = str.charAt(0);
    let str1 = firstChar + "";
    for (let i = 1; i < str.length; i++) {
        ch = str.charAt(i);

        if (ch.toUpperCase() == firstChar.toUpperCase()) {
            j++;
            if (j % 2 == 1)
                ch = '*';
            else
                ch = '$';
        }
        str1 = str1 + ch;
    }
    return str1;
}

const mashUp = function mashUp(string1, string2)
{
    if (arguments.length < 2) throw `One or more parameters is missing`;
    if (typeof(string1) != 'string') throw `First parameter is not a string`;
    if (typeof(string2) != 'string') throw `Secong parameter is not a string`;
    if (string1.length <2) throw "First string is smaller than 2 character";
    if (string1.trim() == "") throw "First string is whitespace only string";
    if (string2.length <2) throw "Second string is smaller than 2 character";
    if (string2.trim() == "") throw "Second string is whitespace only string";

    let str1="";
    str1=str1+string2.charAt(0)+string2.charAt(1);
    let str2="";
    str2=str2+string1.charAt(0)+string1.charAt(1);

    for(let i=2;i<string1.length;i++)
    {
        str1 = str1 + string1.charAt(i);
    }
    for(let i=2;i<string2.length;i++)
    {
        str2 = str2 + string2.charAt(i);
    }

    return (str1+" "+str2);
}


module.exports = {
    camelCase,
    replaceChar,
    mashUp
}