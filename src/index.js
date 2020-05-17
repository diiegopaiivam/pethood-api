require('dotenv').config()

const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
// Seta a variavél que está no arquivo .env a porta, caso não tenha ele starta na porta 3333
const porta = process.env.PORT || 3333
//Seta a variavél de database_url que está no .env
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true,
});


const app = express();
app.use(cors());
app.use(express.json());
//Salva as imagens na pasta de uploads na raiz do projeto através do path
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);
app.use(errors());


app.listen(porta);