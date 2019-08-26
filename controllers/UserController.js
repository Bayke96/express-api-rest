var express = require("express");
var router = express.Router();

var userService = require("../services/UserService");

router.get("/", function(req, res) {

});

router.get("/:id", function(req, res) {

});

router.post("/", function(req, res) {
    console.log(req.body);
});

router.put("/:id", function(req, res) {

});

router.delete("/:id", function(req, res) {

});

module.exports = router;