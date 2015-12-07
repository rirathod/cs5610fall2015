/**
 * Created by riddhirathod on 12/6/15.
 */

"use strict";
var q = require("q");
var nodemailer = require("nodemailer");

module.exports = function(mailConfiguration){
    if(!mailConfiguration) {
        mailConfiguration = {};
        mailConfiguration.user = "cs5610f2015@gmail.com";
        mailConfiguration.pass = "abCD12";
    }

    var api = {
        sendMail : sendMail
    };
    return api;

    function sendMail(options) {
        console.log("In nodemailer.service.server.js");
        var self = this;
        var deferred = q.defer();

        options = options || {};
        var mailOptions = {
            from: mailConfiguration.user, // sender address.  Must be the same as authenticated user if using Gmail.
            to: options.to || "riddhirathod@gmail.com", // list of receivers
            subject: "Welcome to HomeworkTracker", // subject
            text: options.text || "We are sending this email to confirm your registration to JoinUs." // body
        };

        // create reusable transporter object using SMTP transport
        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",  // sets automatically host, port and connection security settings
            auth: {
                user: "cs5610f2015@gmail.com",
                pass: "abCD12#$"
            }
        });

        smtpTransport.sendMail(mailOptions)
            .then(function(error, response){  //callback
                if(error){
                    console.log(error);
                    deferred.reject(error);
                }else{
                    console.log("Message sent: " + response.message);
                    deferred.resolve(response);
                }

                smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
            });
        return deferred.promise;
    }
};