var express = require("express");
var app = express();

var categoryController = require("./controllers/CategoryController");
var productController = require("./controllers/ProductController");
var userController = require("./controllers/UserController");
var profileController = require("./controllers/ProfileController");

app.use("/categories", categoryController);
app.use("/products", productController);
app.use("/users", userController);
app.use("/profiles", profileController);

app.get("*", function(req, res) {
    res.status(404);
});

app.listen(3000);