const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!

  async create(title, plot, rating, runtime, genre, cast, info, actor){

    if(arguments.length<7) throw "The required number of parameter are not provided";
    if(typeof(title)!='string' || typeof( plot)!='string' || typeof(rating)!='string' || typeof(runtime)!='string' || typeof( genre)!='string') throw `The parameter type mismatched`;
    if((title.trim().length==0) || (plot.trim().length==0) || (rating.trim().length==0) || (runtime.trim().length==0) || (genre.trim().length==0)) throw `Parameter is not a valid string`;
    if(Array.isArray(cast)==false) throw "Cast is not an array";
    let count =0; //indicator
    for(let i of cast)
    {
        if(typeof(i)=='string')
        {
            if(i.trim().length>0)
            count++;
        }
    }
    if(count==0) throw "Not even one element in cast array is valid string";
    if(typeof(info)!='object') throw "Parameter: info is not object";
    if(Array.isArray(info)==true)  throw "Parameter: info is an array";
    if(typeof(info.director)!='string') throw "Parameter: info: director is not a string";
    if(info.director.trim().length==0) throw "Parameter: info: director is not a valid string";
    if(typeof(info.yearReleased)!='number') throw "Parameter: info: yearReleased is not in a valid form";
    if(info.yearReleased<1930 || info.yearReleased>new Date().getFullYear()+5 || info.yearReleased%1!=0) throw "Parameter: info: yearReleased is not in a valid year";
    const movieCollection = await movies();

    let newMovie = {
        title: title,
        plot: plot,
        rating: rating,
        runtime: runtime,
        genre: genre,
        cast: cast,
        info: info,
        actor: actor
    }
    const insertInfo = await movieCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'Could not add movie';


    let { ObjectId } = require('mongodb');
    const newId = insertInfo.insertedId.toString();

    const Movie = await this.get(newId);
    return Movie;
  },

  async get(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof(id) !== 'string') throw "Id must be a string";
    if(id.trim().length==0) throw "Id is an empty string";

    let parsedId = ObjectId(id);

    const movieCollection = await movies();
    const movie1 = await movieCollection.findOne({ _id: parsedId });
    if (movie1 === null) throw 'No movie with that id';
    
    movie1._id= movie1._id.toString();
    return movie1;
  },

  async getAll() {
    const movieCollection = await movies();

    const movieList = await movieCollection.find({}).toArray();

    for(let i of movieList)
    {
        i._id = i._id.toString();
    }

    return movieList;
  },

  async remove(id) {
    if(arguments.length==0) throw 'You must provide an id to search for';
    if(typeof(id) !== 'string') throw "Id must be a string";
    if(id.trim().length==0) throw "Id is an empty string";

    let parsedId = ObjectId(id);

    const movieCollection = await movies();
    const deletionInfo = await movieCollection.deleteOne({ _id: parsedId });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete movie with id of ${id}`;
    }
    let res = this.get(id) + "has been deleted";
    return res;
  },

  async rename(id, newTitle) {
    if (!id) throw 'You must provide an id to search for';
    if(typeof(id) !== 'string') throw "Id must be a string";
    if(id.trim().length==0) throw "Id is an empty string";
    if (!newTitle) throw 'You must provide a name for your new movie';
    if(typeof(newTitle) !== 'string') throw "New title must be a string";
    if(newTitle.trim().length==0) throw "New title is an empty string";

    let parsedId = ObjectId(id);
    
    const movieCollection = await movies();
    const updatedMovie = {
      title: newTitle
    };

    const updatedInfo = await movieCollection.updateOne(
      { _id: parsedId },
      { $set: updatedMovie }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not rename movie successfully';
    }

    return await this.get(id);
  }
};

