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

    const client = await Client.findOne({username: data.username}).select({
        password: 1
    });
    
    if (client === null){
        console.log('User does not exist !!!');
    } else if (crypto.comparePassword(data.password, client.password) === false){
        console.log('Wrong password');
    }
    else{
        const refId = client._id;
        res.cookie('userId',refId,{expires: new Date(Date.now() + 3600000), httpOnly: true});
        next();
    }
};