const User = require('./../models/User');
const crypto = require('crypto');

module.exports = {
    async login(request, response){
        const { email, password } = request.body;

        const alg = 'aes-256-ctr';
        const pwd = 'abcdabcd';
        const cipher = await crypto.createCipher(alg, pwd);
        const crypted = cipher.update(password, 'utf8', 'hex');

        const user = await User.find()
            .where('email', email)
            .where('password', crypted)
            .select('name');

        if(user === null || user.length === 0){
            return response.status(400).json({ error: 'Email ou senha inválidas' });
        }

        return response.status(200).json(user);

    }
}