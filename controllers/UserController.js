var express = require("express");
var router = express.Router();

const { getUser, createUser } = require("../services/UserService");

router.get("/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.get("/:id(\\d+)/", function(req, res) {

    getUser(req.params.id, function(response){

        // If an user has been found.
        if(response != null) {

            var foundUser = {
                id: response.id,
                name: response.name,
                createdAt: response.createdAt
            };

            res.status(200);
            res.header("Content-Type",'application/json');
            res.send(JSON.stringify(foundUser, null, 4));
        } 
        // Otherwise
        else 
        {
            res.status(404);
            res.send(null);
        }
    });

});

router.post("/", function(req, res) {

    let latestUser = {};
    const newUser = {
        name: req.body.name,
        password: req.body.password
    };

    createUser(newUser, function(response){
        latestUser.id = response.id;
        latestUser.name = response.name;

        res.status(201);
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(latestUser, null, 4));
    });
});

router.put("/:id(\\d+)/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

router.delete("/:id(\\d+)/", function(req, res) {
    res.header("Content-Type",'application/json');
    res.status(200);
});

module.exports = router;