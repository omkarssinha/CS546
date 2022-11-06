const express = require('express');
const router = express.Router();
const data = require("../data")
const users = data.users

router.get("/",async (req, res) => {
    try{
        let sessionUser = req.session.user.username
        for(let i of users)
        {
            if(i.username===sessionUser)
            {
                username= i.username;
                firstname=i.firstName;
                lastname=i.lastame;
                profession=i.profession;
                bio=i.bio;
                break;
            }
        }        
        res.render("private", {title: "Welcome!", username: username, firstname: firstname, lastname: lastname, profession: profession, bio: bio});
    }catch(e){
        res.send(404).json({error: e});
    }
})

module.exports = router;