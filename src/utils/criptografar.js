const crypto = require('crypto');
const alg = 'aes-256-ctr';
const pwd = 'abcdabcd';

class Criptografar {

    async crytografar(password){
        const cipher = await crypto.createCipher(alg, pwd);
        return cipher.update(password, 'utf8', 'hex');
    }

} 

module.exports = new Criptografar();


