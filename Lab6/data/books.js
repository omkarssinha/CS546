const mongoCollections = require('../config/mongoCollections');
const Books = mongoCollections.books;
let { ObjectId } = require('mongodb');
//const uuid = require('uuid/v4');
module.exports = {

  async getAllBooks() {
    //console.log("We are in GetAllBooks");
    const bookCollection = await Books();
    const bookList = await bookCollection.find({}).toArray();
    if (!bookList) throw 'No Books in system!';
    return bookList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!

  async getBookById(id) {
    //console.log("We are in GetBooksByID");
    const bookCollection = await Books();
    let parsedId = ObjectId(id);
    //console.log(parsedId);
    //console.log(id);
    const book = await bookCollection.findOne({ _id: parsedId });
    if (!book) throw 'Book Not Found';
    return book;
  },

  async addBook(title, author, genre, datePublished, summary) 
  {
    const bookCollection = await Books();
    //console.log("We are in add book");
    let newBook = {
       title : title,
       author: author,
       genre: genre,
       datePublished: datePublished,
       summary: summary,
       reviews: []
    };

    const newInsertInformation = await bookCollection.insertOne(newBook);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getBookById(newInsertInformation.insertedId);
  },
  async removeBook(id) {
    //console.log("V r in removeBook");
    const bookCollection = await Books();
    let parsedId = ObjectId(id);
    const deletionInfo = await bookCollection.removeOne({ _id: parsedId });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete book with id of ${id}`;
    }
    return true;
  },
  async updateBook(id, updatedBook) {
    const book = await this.getBookById(id);
    //console.log(book);
    let reviews = book.reviews;

    let bookUpdateInfo = {
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
      datePublished: updatedBook.datePublished,
      summary: updatedBook.summary,
      reviews: reviews
    };

    if(bookUpdateInfo.title==null)
    bookUpdateInfo.title = book.title;
    if(bookUpdateInfo.author==null)
    bookUpdateInfo.author = book.author;
    if(bookUpdateInfo.genre==null)
    bookUpdateInfo.genre = book.genre;
    if(bookUpdateInfo.datePublished==null)
    bookUpdateInfo.datePublished = book.datePublished;
    if(bookUpdateInfo.summary==null)
    bookUpdateInfo.summary = book.summary;


    const bookCollection = await Books();
    let parsedId = ObjectId(id);
    const updateInfo = await bookCollection.updateOne(
      { _id: parsedId },
      { $set: bookUpdateInfo }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getBookById(id);
  }
};

