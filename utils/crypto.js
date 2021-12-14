const bcrypt = require('bcrypt');

const hashPassword = (password) =>{
    const round = 10;
    const salt = bcrypt.genSaltSync(round);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (plainTextPassword, hash) => {
    return bcrypt.compareSync(plainTextPassword, hash);
}
module.exports = {
    hashPassword,
    comparePassword
}