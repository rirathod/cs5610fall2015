var users = require("./user.mock.json");

model.exports = function(app) {
    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        findByCreds: findByCreds,
        update: update,
        remove: remove
    };
    return api;

    function create() {
        users.push();
        return users;
    }

    function findAll() {

    }

    function findById() {

    }

    function findByCreds() {

    }

    function update() {

    }

    function remove() {

    }
};