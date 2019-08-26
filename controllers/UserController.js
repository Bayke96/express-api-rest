var express = require("express");
var router = express.Router();

var userService = require("../services/UserService");

router.get("/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.get("/:id", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.post("/", function(req, res) {
    res.status(201);
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(req.body, null, 4));
});

router.put("/:id", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.delete("/:id", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

module.exports = router;