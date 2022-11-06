const express = require('express');
const router = express.Router();
//const data1 = require('../data/books');
const data = require('../data');
//var bodyParser = require('body-parser');
//app.use(bodyParser.OptionsJson);
const bookData = data.books;

router.get('/', async (req, res) => {
  
    try {
      const bookList = await bookData.getAllBooks();
      res.json(bookList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const book = await bookData.getBookById(req.params.id);
    res.status(200).json(book);
  } catch (e) {
    let error = e.toString();
    res.status(404).json({"error": error});
  }
});

router.post('/', async (req, res) => {
  //console.log(req.body)
  if(Object.keys(req.body).length!==5)
  {
    res.status(400).json({ error: 'Field count is not correct' });
    return;
  }
  const newbookData = req.body;

  if (!newbookData.title || !newbookData.author || !newbookData.genre || !newbookData.datePublished || !newbookData.summary) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }

  if(newbookData.title==""){
    res.status(400).json({ error: 'Title must not be an empty string' });
    return;
  }
  if(!newbookData.author["authorFirstName"] || !newbookData.author["authorLastName"] || (newbookData.author["authorFirstName"]=="" || newbookData.author["authorLastName"]=="")){
    res.status(400).json({ error: 'Author name is not in proper format' });
    return;
  }
  if(newbookData.genre.length===0){
    res.status(400).json({ error: 'Genre cannot be empty' });
    return;
  }
  let j=0;
  for(let i =0;i<newbookData.genre.length;i++)
  {
    if(newbookData.genre[i]=="")
    j++;
  }
  if(j>0){
    res.status(400).json({ error: 'Genre cannot be empty' });
    return;
  }
  try{
    if(new Date(newbookData.datePublished)); 
  } catch(e){
    res.status(400).json({ error: 'Date published is not in right format1' });
    return;
  }
  let date1 =new Date(newbookData.datePublished); 
  /*console.log(date1.getMonth(),newbookData.datePublished.substring(0,2));
  console.log(date1.getFullYear(),newbookData.datePublished.substring(6,10));*/

  if((parseInt(date1.getMonth())+1)!=parseInt(newbookData.datePublished.substring(0,2))&& (parseInt(date1.getMonth())+1)!=parseInt(newbookData.datePublished.substring(0,1))){
    res.status(400).json({ error: 'Date published is not in right format2' });
    return;
  }
  if(parseInt(date1.getFullYear())!=parseInt(newbookData.datePublished.substring(6,10))&& parseInt(date1.getFullYear())!=parseInt(newbookData.datePublished.substring(5,9)) && parseInt(date1.getFullYear())!=parseInt(newbookData.datePublished.substring(4,8))){
    res.status(400).json({ error: 'Date published is not in right format3' });
    return;
  }

  if(newbookData.summary==""){
    res.status(400).json({ error: 'Title must not be an empty string' });
    return;
  }

  try {
    const { title, author, genre, datePublished, summary } = newbookData;
    const newbook = await bookData.addBook(title, author, genre, datePublished, summary);
    res.status(200).json(newbook);
  } catch (e) {
    
    let error= e.toString();
    res.status(500).json({ error: error});
  }
}); 
/********************************************************************************************************** */
router.put('/:id', async (req, res) => {
  if(Object.keys(req.body).length!==5)
  {
    res.status(400).json({ error: 'Field count is not correct' });
    return;
  }
  const updatedData = req.body;
  if (!updatedData.title || !updatedData.author || !updatedData.genre || !updatedData.datePublished || !updatedData.summary) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }

  if(updatedData.title==""){
    res.status(400).json({ error: 'Title must not be an empty string' });
    return;
  }
  if(!updatedData.author["authorFirstName"] || !updatedData.author["authorLastName"] || (updatedData.author["authorFirstName"]=="" || updatedData.author["authorLastName"]=="")){
    res.status(400).json({ error: 'Author name is not in proper format' });
    return;
  }
  if(updatedData.genre.length===0){
    res.status(400).json({ error: 'Genre cannot be empty' });
    return;
  }
  let j=0;
  for(let i =0;i<updatedData.genre.length;i++)
  {
    if(updatedData.genre[i]=="")
    j++;
  }
  if(j>0){
    res.status(400).json({ error: 'Genre cannot be empty' });
    return;
  }
  try{
    if(new Date(updatedData.datePublished)); 
  } catch(e){
    res.status(400).json({ error: 'Date published is not in right format1' });
    return;
  }
  let date1 =new Date(updatedData.datePublished); 
  /*console.log(date1.getMonth(),updatedData.datePublished.substring(0,2));
  console.log(date1.getFullYear(),updatedData.datePublished.substring(6,10));*/

  if((parseInt(date1.getMonth())+1)!=parseInt(updatedData.datePublished.substring(0,2))&& (parseInt(date1.getMonth())+1)!=parseInt(updatedData.datePublished.substring(0,1))){
    res.status(400).json({ error: 'Date published is not in right format2' });
    return;
  }
  if(parseInt(date1.getFullYear())!=parseInt(updatedData.datePublished.substring(6,10))&& parseInt(date1.getFullYear())!=parseInt(updatedData.datePublished.substring(5,9)) && parseInt(date1.getFullYear())!=parseInt(updatedData.datePublished.substring(4,8))){
    res.status(400).json({ error: 'Date published is not in right format3' });
    return;
  }

  if(updatedData.title==""){
    res.status(400).json({ error: 'Title must not be an empty string' });
    return;
  }
  
  try {
    await bookData.getBookById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'book not found1' });
    return;
  }

  try {
    const updatedbook = await bookData.updateBook(req.params.id, updatedData);
    res.status(200).json(updatedbook);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
/*********************************************************************************************************** */
router.patch('/:id', async (req, res) => {
  if(Object.keys(req.body).length>5 || Object.keys(req.body).length<1)
  {
    res.status(400).json({ error: 'Field count is not correct' });
    return;
  }
  const requestBody = req.body;
  let patchList = Object.keys(req.body);
  
  for(let i of patchList)
  {
    if(i!="title" && i!="author" && i!="genre" && i!="datePublished" && i!="summary")
    {
      res.status(400).json({ error: 'Bad Data: Wrong Fields are present' });
      return;
    }
  }

  let updatedObject = {};
  try {
    const oldbook = await bookData.getBookById(req.params.id);
    //console.log("GI"+requestBody.title);
    if (requestBody.title && requestBody.title !== oldbook.title)
      updatedObject.title = requestBody.title;
    // console.log("GI1"+requestBody.author);
    if (requestBody.author && (requestBody.author.authorFirstName !== oldbook.author.authorFirstName || requestBody.author.authorLastName !== oldbook.author.authorLastName))
      updatedObject.author = requestBody.author;
    // console.log("GI3"+requestBody.genre);
    if (requestBody.genre)
    {
      let newGenre = [];
      for (let i of requestBody.genre)
      { 
        if(i=="")
        {
          res.status(400).json({ error: 'Genre cannot be empty' });
           return;
        }

        if(oldbook.genre.includes(i)==false)
        newGenre.push(i);
      }
      updatedObject.genre = newGenre.concat(oldbook.genre);
    }
    // console.log("GI4"+requestBody.datePublished);
    if (requestBody.datePublished && requestBody.datePublished !== oldbook.datePublished)
      updatedObject.datePublished = requestBody.datePublished;
    // console.log("GI5"+requestBody.summary);
    if (requestBody.summary && requestBody.summary !== oldbook.summary)
      updatedObject.summary = requestBody.summary;
  } catch (e) {
    res.status(404).json({ error: 'book not found2' });
    return;
  }

  if(requestBody.title && requestBody.title==""){
    res.status(400).json({ error: 'Title must not be an empty string' });
    return;
  }
  if(requestBody.author &&(!requestBody.author["authorFirstName"] || !requestBody.author["authorLastName"] || (requestBody.author["authorFirstName"]=="" || requestBody.author["authorLastName"]==""))){
    res.status(400).json({ error: 'Author name is not in proper format7' });
    return;
  }
  if(requestBody.genre && requestBody.genre.length===0){
    res.status(400).json({ error: 'Genre cannot be empty' });
    return;
  }
  if(requestBody.genre){
  let j=0;
  for(let i =0;i<requestBody.genre.length;i++)
  {
    if(requestBody.genre[i]=="")
    j++;
  }
  if(j==requestBody.genre.length){
    res.status(400).json({ error: 'Genre cannot be empty' });
    return;
    }
  }
  if(requestBody.datePublished){
  try{
    if(new Date(requestBody.datePublished)); 
  } catch(e){
    res.status(400).json({ error: 'Date published is not in right format1' });
    return;
  }
  let date1 =new Date(requestBody.datePublished); 
  /*console.log(date1.getMonth(),requestBody.datePublished.substring(0,2));
  console.log(date1.getFullYear(),requestBody.datePublished.substring(6,10));*/

  if((parseInt(date1.getMonth())+1)!=parseInt(requestBody.datePublished.substring(0,2))&& (parseInt(date1.getMonth())+1)!=parseInt(requestBody.datePublished.substring(0,1))){
    res.status(400).json({ error: 'Date published is not in right format2' });
    return;
  }
  if(parseInt(date1.getFullYear())!=parseInt(requestBody.datePublished.substring(6,10))&& parseInt(date1.getFullYear())!=parseInt(requestBody.datePublished.substring(5,9)) && parseInt(date1.getFullYear())!=parseInt(requestBody.datePublished.substring(4,8))){
    res.status(400).json({ error: 'Date published is not in right format3' });
    return;
   }
  }  

  if (Object.keys(updatedObject).length !== 0) {
    try {
      //console.log(updatedObject);
      const updatedbook = await bookData.updateBook(
        req.params.id,
        updatedObject
      );
      res.status(200).json(updatedbook);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400).json({
      "error":
        'No fields have been changed from their inital values, so no update has occurred'
    });
  }
});
/*********************************************************************************************************** */
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply an ID to delete' });
    return;
  }
  try {
    await bookData.getBookById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'book not found' });
    return;
  }
  try {
    await bookData.removeBook(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});



module.exports = router;