const nodemailer = require('nodemailer');
// Instanciando variavéis do envio de email
const host = 'smtp.gmail.com';
const service = 'ssl';
const port = 465;
const secure = true;
const userMail = 'diiegopaiivam@gmail.com';

class Mailer {
    async sender(email,name){
        const send = await nodemailer.createTransport({

            host: host,
            service: service,
            port: port,
            secure: secure,
            auth:{
                user: 'diiegopaiivam@gmail.com',
                pass: '2005009075420'
            }
        });
        //Passando as opções do email, como destinatário e o remetente.
        const mailOptions = {
            from: userMail,
            to: email,
            subject: 'Cadastro no sistema',
            text: 'Olá ' + name + ' Seu cadastro foi realizado com sucesso!'
        }

        //enviando email fazendo uma pequena verificação se foi enviado ou não exibindo o erro do envio
        send.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err);
            }else{
                console.log('Mensagem enviada', info);
            }
        });

    }

    async senderCreateIncident(email,name){
        const send = await nodemailer.createTransport({

            host: host,
            service: service,
            port: port,
            secure: secure,
            auth:{
                user: 'diiegopaiivam@gmail.com',
                pass: '2005009075420'
            }
        });
        //Passando as opções do email, como destinatário e o remetente.
        const mailOptions = {
            from: userMail,
            to: email,
            subject: 'Novo Caso Cadastrado',
            text: 'Olá ' + name + ' Seu caso foi foi cadastrado, aguarde algum herói para ajuda-lo!'
        }

        //enviando email fazendo uma pequena verificação se foi enviado ou não exibindo o erro do envio
        send.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err);
            }else{
                console.log('Mensagem enviada', info);
            }
        });

    }
    
}

module.exports = new Mailer();

