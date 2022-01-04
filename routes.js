var express = require('express');
var db = require('./services/dataservice.js');
db.connect();

var router = require('express').Router();

    router.use(express.urlencoded({
        extended: true
    }));






module.exports = router;
