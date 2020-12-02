const Joi = require('joi')
const BaseRoute = require('./base/baseRoute')


class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config:{
                validate:{
                    failAction:(request,headers, erro) =>{
                        throw erro;
                    },
                    query: Joi.object( {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(100)

                    })
                }
            },

            handler: (request, headers) => {
                try {
                    
                    const {skip, limit, name} = request.query
                    /*
                    let query = {}
                    
                    if(name){
                        query.name = name;
                    }
                    
                    if(isNaN(skip)){
                        throw Error ('O tipo do skip é incorreto')
                    }
                    if(isNaN(limit)){
                        throw Error (' O tipo do limit é incorreto')
                    }
                    */
                   const query = {
                       name :{
                           $regex: `.*${name}*.`
                       }
                   } 
                    return this.db.read(name ? query : {}, skip, limit);
                    
                } catch (error) {
                   console.log('Deu ruim no servidor', error);
                   return "Erro interno no servidor"
                }
            }
        }
    }
   
    
}

module.exports = HeroRoutes