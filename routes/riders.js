const db = require('../models/index');
const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next){
    res.send('Success');
});

router.post('/', function(req, res, next){
    db.Rider.create( { name: req.body.name, 
        age: req.body.age,
        profession: req.body.profession
    }).then(user => {
    
    }).catch( error => {

    });
    res.send('Success');
});

module.exports = router;