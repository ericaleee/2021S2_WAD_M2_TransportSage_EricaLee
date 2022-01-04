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
    var data = req.body;
    db.register(data.name, data.email, data.password, data.phone,
        function (err, event) {
            res.redirect('back');
        })
});
  



module.exports = router;
