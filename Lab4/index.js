const movies = require('./data/movies');
const connection = require('./config/mongoConnection');
let { ObjectId } = require('mongodb');
const { remove } = require('./data/movies');

const main = async () => {

  const billAndTed = await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
  console.log(billAndTed);
  const darkKnight= await movies.create("The Dark Knight","When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.","R", "2hr 32min","Action",["Christian Bale","Heath Ledger"],{director: "Christopher Nolan", yearReleased: 2008});
  console.log(await movies.getAll());
  const hiddenFigures= await movies.create("Hidden Figures","The story of a team of female African-American mathematicians who served a vital role in NASA during the early years of the U.S. space program.","PG", "2hr 7min","Drama",["Taraji P. Henson","Octavia Spencer", "Janelle Monáe"],{director: "Theodore Melfi", yearReleased: 2016},"avgv");
  console.log(hiddenFigures);
  try{
    console.log(await movies.rename(billAndTed._id.toString(),"Bill and Patrick1 Face the Music"));
  } catch(e){
      console.log(e);
  }
  try{
    await movies.remove(darkKnight._id.toString());
  } catch(e){
      console.log(e);
  }
  console.log(await movies.getAll());

  try{ //should fail
    console.log(await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2029}));
  } catch(e){
      console.log("The movie parameter is faulty");
      console.log(e);
  }
  try{ //should fail
    console.log(await movies.remove("gvgk"));
  } catch(e){
      console.log("The movie to remove does not exist");
      console.log(e);
  }
  try{ //should fail
    console.log(await movies.rename("kjk","New Name"));
  } catch(e){
      console.log("The movie to rename does not exist");
      console.log(e+".");
  }
  try{ //should fail
    console.log(await movies.rename(billAndTed._id.toString(),10));
  } catch(e){
      console.log("The movie to rename has a wrong new name parameter");
      console.log(e);
  }
  try{ //should fail
    console.log(await movies.get("fgdgh"));
  } catch(e){
      console.log("The movie to get does not exist");
      console.log(e+".");
  }
  
  const db = await connection();
  await db.serverConfig.close();

  console.log('Done!');
};

main().catch((error) => {
  console.log(error);
});