const mongoCollections = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');
//const Reviews = mongoCollections.reviews;
const Books = mongoCollections.books;
//const books = require('./books');
//const uuid = require('uuid/v4');

let exportedMethods = {
  async getAllReviews(id)
  {
    const bookCollection = await Books();
    let parsedId = ObjectId(id);
    const book = await bookCollection.findOne({ _id: parsedId });
    if (!book) throw 'Book Not Found';
    reviewList = book.reviews;
    return reviewList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getReviewById(id)
  {
    const bookCollection = await Books();
    let review = {};
    const reviewAll = await bookCollection.find({},{projection: {_id:0, reviews: 1}}).toArray();
    //console.log(reviewAll);
    for(let i of reviewAll)
    {
      //console.log(typeof(i));
      if(i.reviews.length==0)
      continue;

      for(let j of i.reviews)
      {
        if(j.id == id)
        {
          //console.log(j);
          review = j;
          break;
        }
      }
    }    
    /*const book = await reviewCollection.findOne({ _id: id });
    if (!book) throw 'Book not found';*/
    return review;
  },
  async addReview(id, title, reviewer, rating, dateOfReview, review) 
  {
    const bookCollection = await Books();
    const idOfReview = ObjectId();
    
    let newReview = {
       id: idOfReview,
       title : title,
       reviewer: reviewer,
       rating: rating,
       dateOfReview: dateOfReview,
       review: review
    };
    //console.log(newReview);
    let parsedId = ObjectId(id);
    return bookCollection
      .updateOne({ _id: parsedId }, { $push: { reviews: newReview } })

    /*const newInsertInformation = await bookCollection.update({_id: id}, {$push: newReview});
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getReviewById(idOfReview);*/

  },
  async removeReview(id) 
  {
    const bookCollection = await Books();
    //console.log(id);
    let parsedId = ObjectId(id);
    let bookId;

    const reviewAll = await bookCollection.find({},{projection: {_id:1, reviews: 1}}).toArray();
    for(let i of reviewAll)
    {
      if(i.reviews.length==0)
      continue;

      for(let j of i.reviews)
      {
        if(j.id == id)
        {
          bookId = i._id;
          break;
        }
      }
    }
    //console.log(bookId);
    let parsedId1 = ObjectId(bookId);
    //return await bookCollection.update({ id:"60577a3953e3f554d46e07e0"},{$pull : { "reviews" : {"id": parsedId} } } );
      //WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
      return bookCollection
      .updateOne({ _id: parsedId1 }, { $pull: { reviews: { id: parsedId } } });
  }



};

module.exports = exportedMethods;