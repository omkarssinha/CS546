const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require("../data");
const users = data.users;

//var salt = bcrypt.genSaltSync(16);

router.post("/", async (req, res) => {
    
    let username = req.body.username;
    let password= req.body.password;
    //var hash = bcrypt.hashSync(password, salt);
    //let hashPassword=hash;
    //console.log(hash);
    let failed=1;
    for(let i of users)
    {
        if(i.username===username)
        {
            let match = await bcrypt.compare(password, i.hashedPassword);  //users.match(i.hashedPassword);               
            if(match)
            {
                failed=0;
                req.session.user={username: i.username};
                break;
            }
        }
    }
    if(failed==0)
    {
        res.redirect('/private');
    }
    else
    {
        res.status(401).render("login", {title: "Welcome, please login to your account", failed: failed});
    }
});

module.exports = router;