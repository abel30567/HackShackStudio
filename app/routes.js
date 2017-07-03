module.exports = function(app, server, io) {

    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    var asynq          = require('async');
    var nodemailer     = require('nodemailer');

    var fs = require('fs');
    var smtpTransport  = require('nodemailer-smtp-transport');
    var wellknown      = require('nodemailer-wellknown');
    var bodyParser     = require('body-parser');

    var bcrypt         = require('bcrypt-nodejs');
    var crypto         = require('crypto');

    var User           = require('./models/user');

    var configAuth = require('../config/auth'); // use this one for testing

    var _              = require('underscore-node');
    const util = require('util')

    var path = require('path');

    app.get("/contact-req", function(req, res){

        var email = req.query.email.trim().toLowerCase();
        var name = req.query.name.trim();
        var lastn = req.query.lastn.trim();
        var message = req.query.message.trim();

        //Check if the email is taken
        if( name == "" || email == "" || lastn == "" || message == "" ){
            res.send(JSON.stringify({ "message" : "FAILURE", "rson" : "EMPTY_F"}));
        }else if(!validateEmail(email)){
            res.send(JSON.stringify({ "message" : "FAILURE", "rson" : "INV_EMAIL"}));
        }else{
                        // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'info@imarkett.com',
                    pass: 'iMarkettinfo2017'
                }
            });

            var text = 'Name : ' + name + ' ' + lastn + '\n';
            text += 'Email : ' + email + '\n';
            text += 'Message : ' + message + '\n';

            // setup email data with unicode symbols
            var mailOptions = {
                from: "info@imarkett.com", // sender address
                to: "claudio@imarkett.com", // list of receivers
                subject: 'Message from your page', // Subject line
                text: text, // plain text body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error : " + error);
                }else{
                    res.send(JSON.stringify({ "message" : "SUCCESS"}));
                }
            });
        }

    });

    app.get("/", function(req, res){
        res.sendFile(path.join(rootDir + '/index.html'));
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
};
