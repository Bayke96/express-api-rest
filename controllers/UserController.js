var express = require("express");
var router = express.Router();

const { createUser } = require("../services/UserService");

router.get("/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.get("/:id", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.post("/", function(req, res) {

    let latestUser = {};
    const newUser = {
        name: req.body.name,
        password: req.body.password
    };

    createUser(newUser).then(function(result){
        
    });

    res.status(201);
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(latestUser, null, 4));
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