var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var categoryController = require("./controllers/CategoryController");
var productController = require("./controllers/ProductController");
var userController = require("./controllers/UserController");
var profileController = require("./controllers/ProfileController");

// Content-Type: application/json
app.use(bodyParser.json({ limit: '100mb' }));

app.use("/categories", categoryController);
app.use("/products", productController);
app.use("/users", userController);
app.use("/profiles", profileController);

app.get("*", function(req, res) {
    return res.status(404).json({
        ok: false,
        data: {
            msg: "Page not found",
            method: "get"
        }
    });
});

app.listen(3000);
console.log("Server running in http://localhost:3000");