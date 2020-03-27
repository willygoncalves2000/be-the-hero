const connection = require('../database/connection');
const generateUniqueId = require ('../utils/generateUniqueId');

module.exports = {
    async index (request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    
    },
    
    async create(request, response){
    //pega o corpo da requisição e faz a desestruturação para pegar cada um
    const { name, email, whatsapp, city, uf} = request.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf

    });
    
    return response.json({ id });
    }
   

    
}