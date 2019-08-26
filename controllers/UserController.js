var express = require("express");
var router = express.Router();

const User = require('../models/user');
const userService = require("../services/UserService");

router.get("/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.get("/:id", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.post("/", function(req, res) {

    const newUser = {
        name: req.body.name,
        password: req.body.password
    };

    var createdUser = userService.createUser(newUser);

    res.status(201);
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(createdUser, null, 4));
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