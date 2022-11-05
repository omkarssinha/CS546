//const prompt = require('prompt');
const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');


try{ //should pass
    console.log(arrayUtils.mean([1, 2, 3])); // Returns: 2
    console.log("Mean Successful")
}catch(e){
    console.log(e);
    console.error(" Mean Failed");
}

try{ //should fail
    console.log(arrayUtils.mean(["guitar", 2, 3])); // error
    console.log("Mean Successful")
}catch(e){
	console.log(e);
    console.error("Mean Failed\n");
}

try{ //should pass
    console.log(arrayUtils.medianSquared([1,2,4])); // Returns: 4
    console.log("Median Successful");
} catch(e){
    console.error("Median Failed");
}

try{ //should fail
    console.log(arrayUtils.medianSquared([1, 3, "apple"])); // throws an error
    console.log("Median Successful");
} catch(e){
	console.log(e);
    console.error("Median Failed\n");
}


try{//should pass
    console.log(arrayUtils.maxElement([13, 9, 23, 0, 22])); // Returns: {'7': 2}
	console.log("MaxElement Successful");
} catch(e){
	console.log(e);
    console.error("MaxElement Failed");
}

try{// should fail
    console.log(arrayUtils.maxElement([1,2,"nope"])); // throws error
	console.log("MaxElement Successful");
} catch(e){
	console.log(e);
    console.error("MaxElement Failed\n");
}



try{ //should pass
    console.log(arrayUtils.fill(6)); // Returns: [0, 1, 2, 3, 4, 5]
    console.log("Fill Successful");
} catch(e){
	console.log(e);
    console.error("Fill Failed");
}

try{ //should fail
    console.log(arrayUtils.fill(-4)); // Throws Error
    console.log("Fill Successful");
} catch(e){
	console.log(e);
    console.error("Fill Failed\n");
}


try{ //should pass
    console.log(arrayUtils.countRepeating([7, '7.890','7', 13, "Hello","Hello", "hello",7.89,7.890])); //Returns {'7': 2, Hello: 2} 
	console.log("countRepeating Successful");
} catch(e){
	console.log(e);
    console.error("countRepeating Failed");
}

try{ //should fail
    console.log(arrayUtils.countRepeating([7, '7', 13, true, null])); //Throws error
	console.log("countRepeating Successful");
} catch(e){
	console.log(e);
    console.error("countRepeating Failed\n");
}

try{ //should pass
    console.log(arrayUtils.isEqual([
        [9, 2, 3],
        [4, 6, 5],
        ],
        [
        [2, 9, 3],
        [5, 4, 6],
        ])); // Returns: true
	console.log("isEqual Successful");    
} catch(e){
	console.log(e);
    console.error("isEqual Failed");
}

try{ //should fail
    console.log(arrayUtils.isEqual([1, 2, 3])); // Returns: false
	console.log("isEqual Successful");    
} catch(e){
	console.log(e);
    console.error("isEqual Failed\n");
}

try{//should pass
    console.log(stringUtils.camelCase("How now brown cow")); // Returns: "howNowBrownCow"
    console.log("camelCase Successful");
} catch(e){
    console.log(e);
	console.error("camelCase failed");
}

try{//should fail
    console.log(stringUtils.camelCase()); // Throws Error
    console.log("camelCase Successful");
} catch(e){
    console.log(e);
	console.error("camelCase failed\n");
}

try{//should pass
    console.log(stringUtils.replaceChar("Daddy")); // Returns: "Da*$y"
    console.log("replaceChar Successful");
} catch(e){
    console.log(e);
	console.error("replaceChar failed");
}

try{//should fail
    console.log(stringUtils.replaceChar(123)); // Throws Error
	console.log("replaceChar Successful");
} catch(e){
    console.log(e);
	console.error("replaceChar failed\n");
}

try{//should pass
    console.log(stringUtils.mashUp("Patrick", "Hill")); // Returns "Hitrick Pall"
	console.log("mashUp Successful");
} catch(e){
    console.log(e);
	console.error("mashUp failed");
}

try{//should fail
    console.log(stringUtils.mashUp("h", "Hello")); // Throws Error
	console.log("mashUp Successful");
} catch(e){
    console.log(e);
	console.error("mashUp failed\n");
}
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
const fourth = {};

try{ //should pass
    console.log(objUtils.makeArrays([third, first, second])); 
    // [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]
    console.log("MakeArray successful");
}catch(e){
    console.log(e);
	console.log("makeArrays failed");
}

try{ //should fail
    console.log(objUtils.makeArrays([third, fourth])); 
    //throws error
    console.log("MakeArray successful");
}catch(e){
    console.log(e);
	console.log("makeArrays failed\n");
}

try{ //should pass
    console.log(objUtils.isDeepEqual({a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}, {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}));  //return true
    console.log("isDeepEqual successful");
}catch(e){
    console.log(e);
	console.log("isDeepEqual failed");
}

try{ //should fail
    console.log(objUtils.isDeepEqual([],[]));  //throws error
    console.log("isDeepEqual successful");
}catch(e){
    console.log(e);
	console.log("isDeepEqual failed\n");
}

try{ //should pass
    console.log(objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2)); /* Returns:{  a: 6,  b: 14,  c: 10}*/
    console.log("computeObject successful");
}catch(e){
    console.log(e);
	console.log("computeObject failed");
}

try{ //should fail
    console.log(objUtils.computeObject({ a: 3, b: 7, c: 5}));  //throws error
    console.log("computeObject successful");
}catch(e){
    console.log(e);
	console.log("computeObject failed\n");
}

