var express = require("express");
var router = express.Router();

var profileService = require("../services/ProfileService");

router.get("/:id(\\d+)/", function(req, res) {
    res.status(200);
    res.header("Content-Type",'application/json');
});

router.post("/", function(req, res) {
    res.status(200);
    res.header("Content-Type",'application/json');
});

router.put("/:id(\\d+)/", function(req, res) {
    res.status(201);
    res.header("Content-Type",'application/json');
});

router.delete("/:id(\\d+)/", function(req, res) {
    res.status(200);
    res.header("Content-Type",'application/json');
});

module.exports = router;