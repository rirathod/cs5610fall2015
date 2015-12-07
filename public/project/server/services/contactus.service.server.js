/**
 * Created by riddhirathod on 12/1/15.
 */

"use strict";
module.exports = function(app, model){
    app.post("/api/project/contactus", CreateContactUsMessage);
    app.get("/api/project/contactus", FindAllContactUsMessages);

    function CreateContactUsMessage(req, res){
        model
            .Create(req.body)
            .then(function(response) {
                res.json(response);
            });
    }

    function FindAllContactUsMessages(req, res) {
        model.
            FindAll()
            .then(function(messages) {
               res.json(messages);
            });
    }
};