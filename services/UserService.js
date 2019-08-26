var userModel = require("../models/user");

const createUser = (userObject) => {
    return User.create({
        name: userObject.name,
        password: userObject.password
    }).then(function (users) {
        if (users) {
            return User;
        } else {
            return null;
        }
    });
};

module.exports = createUser;