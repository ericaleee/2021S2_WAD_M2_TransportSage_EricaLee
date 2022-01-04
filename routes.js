var bodyParser=require("body-parser");
var express = require('express');
var db = require('./services/dataservice.js');
db.connect();

var router = require('express').Router();
  
router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

router.get('/register', function (req, res) {
    res.sendFile(__dirname + "/views/register.html");
});

router.get('/css/*', function(req, res)  {
    res.sendFile(__dirname+"/views/"+req.originalUrl);
});

router.get('/js/*', function(req, res)  {
    res.sendFile(__dirname+"/views/"+req.originalUrl);
});
  
router.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
db.collection('users').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('signup_success.html');
})
  



module.exports = router;
