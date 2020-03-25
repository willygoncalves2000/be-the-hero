// importa as funcionalidades do express para a const
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//cria a aplicação com as funcionalidades
const app = express();

app.use(cors());


//informa pro app que estamos utilizando json
app.use(express.json());

app.use(routes);


//faz a aplicação ouvir a porta 3333
app.listen(3333);
