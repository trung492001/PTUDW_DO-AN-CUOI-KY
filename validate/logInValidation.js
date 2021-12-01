const Client = require('../models/customer.model');
const crypto = require('../utils/crypto');

module.exports.validateLoginClient = async function(req,res,next){
    const data = req.body;

    if (!data.username){
        console.log('Username is required');
    }

    if (!data.password){
        console.log('Password is required');
    }

    const clients = await Client.findOne({username: data.username}).select({
        password: 1
    });
    
    if (section === null){
        console.log('User does not exist !!!');
    } else if (!crypto.comparePassword(section.password,crypto.hashPassword(data.password))){
        console.log('Wrong password');
    }
    else{
        const refId = section._id;
        res.cookie('userId',refId,{expires: new Date(Date.now() + 3600000), httpOnly: true});
        next();
    }
    //console.log(section);
};