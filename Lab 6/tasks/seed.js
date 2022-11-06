const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const book1 = await books.addBook('XYZ', 'Patrick Hill', 'adventure', '03-20-2021', 'This is a book of adventure');
  const id = book1._id;
  await reviews.addReview(id,'Good','abcd',5,'03-20-21','This a good book');
  await reviews.addReview(
    id,'So so','abcd2',3,'03-20-21','This an ok book'
  );

  await reviews.addReview(id,'Excellent','abcd3',5,'03-20-21','This an excellent book'
  );

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();