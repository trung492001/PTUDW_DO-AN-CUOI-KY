var _ = require('lodash');	
var nodemailer = require('nodemailer');

var config = {
    service: 'gmail',
    auth: {
        user: 'dttrung19@clc.fitus.edu.vn',
        pass: 'trung492001'
    }
};
    
var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: 'ThinkVip <dttrung19@clc.fitus.edu.vn>',
    text: 'test text',
};

module.exports.send = function(mail){
    // use default setting
    mail = _.merge({}, defaultMail, mail);
    console.log(mail);
    // send email
    transporter.sendMail(mail, function(error, info){
        if(error){
            console.log('Error Occurs');
            console.log(error);
        }else
            console.log('Email sent successfully');
    });
};