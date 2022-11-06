const express = require('express');
const router = express.Router();

router.get("/",async (req, res) => {
    try{
        if(req.session.user)
        res.redirect("/private");
        else
        res.render("login", {title: "Welcome, please login to your account"});
    }catch(e){
        res.send(404).json({error: e});
    }
});

module.exports = router;