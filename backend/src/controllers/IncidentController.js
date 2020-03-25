const connection = require('../database/connection');


module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;
        
        //conta o numero de incidents
        const [count] = await connection('incidents').count();

        console.log(count);


        //lista os incidents com paginação, e dados da ong
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name',
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

   
    async create(request, response){
        const { title, description, value } = request.body;
        
        //dados do contexto da requisição (autenticação por exemplo)
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
          title,
          description,
          value,
          ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;

        //pega id da ong logada
        const ong_id = request.headers.authorization;
        
        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incidents.ong_id !== ong_id) {
            return response.status(401).json({error: 'Operation not permitted'})
        }

        await connection('incidents').where('id', id).delete();
    
        return response.status(204).send();
    }
};