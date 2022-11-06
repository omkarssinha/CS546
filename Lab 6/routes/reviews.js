const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;
const reviewData = data.reviews;

router.get('/:id', async (req, res) => {
    try {
      const review = await reviewData.getAllReviews(req.params.id);
      res.status(200).json(review);
    } catch (e) {
      let error = e.toString();
      res.status(404).json({"error": error });
    }
  });
/******************************************************************************************************************/
router.post('/:id', async (req, res) => {
  //console.log(req.body)
  if(Object.keys(req.body).length!==5)
  {
    res.status(400).json({ error: 'Field count is not correct' });
    return;
  }
  const newReviewData = req.body;
  
  if (!newReviewData.title || !newReviewData.reviewer || !newReviewData.rating || !newReviewData.dateOfReview || !newReviewData.review)
  {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }
  if(newReviewData.title==""){
    res.status(400).json({ error: 'Title must not be an empty string' });
    return;
  }
  if(newReviewData.rating!=1 && newReviewData.rating!=2 && newReviewData.rating!=3 && newReviewData.rating!=4 && newReviewData.rating!=5){
    res.status(400).json({ error: 'Rating format is incorrect' });
    return;
  }
  try{
    if(new Date(newReviewData.dateOfReview)); 
  } catch(e){
    res.status(400).json({ error: 'Date published is not in right format' });
    return;
  }
  let date1 =new Date(newReviewData.dateOfReview); 
  /*console.log(date1.getMonth(),newReviewData.dateOfReview.substring(0,2));
  console.log(date1.getFullYear(),newReviewData.dateOfReview.substring(6,10));*/

  if((parseInt(date1.getMonth())+1)!=parseInt(newReviewData.dateOfReview.substring(0,2))&& (parseInt(date1.getMonth())+1)!=parseInt(newReviewData.dateOfReview.substring(0,1))){
    res.status(400).json({ error: 'Date published is not in right format' });
    return;
  }
  if(parseInt(date1.getFullYear())!=parseInt(newReviewData.dateOfReview.substring(6,10))&& parseInt(date1.getFullYear())!=parseInt(newReviewData.dateOfReview.substring(5,9)) && parseInt(date1.getFullYear())!=parseInt(newReviewData.dateOfReview.substring(4,8))){
    res.status(400).json({ error: 'Date published is not in right format' });
    return;
  }
  
  try {
    const { title, reviewer, rating, dateOfReview, review} = newReviewData;
    const newReview = await reviewData.addReview(req.params.id, title, reviewer, rating, dateOfReview, review);
    res.status(200).json(newReview);
  } catch (e) {
    let error = e.toString();
    res.status(500).json({ "error": error });
  }
}); 
/*************************************************************************************************************** */
router.get('/review/:id', async (req, res) => {
  try {
    const review = await reviewData.getReviewById(req.params.id);
    res.status(200).json(review);
  } catch (e) {

    let error = e.toString();
    res.status(500).json({ "error": error });

    //res.status(500).json({ error: 'review not found' });
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply an ID to delete' });
    return;
  }
  try {
    
    await reviewData.getReviewById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'review not found' });
    return;
  }
  try {
    
    await reviewData.removeReview(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
  });
  
  module.exports = router;