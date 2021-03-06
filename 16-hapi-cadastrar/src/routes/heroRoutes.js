const Joi = require('joi')
const failAction = (request,headers, erro) =>{
    throw erro;
}
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
                    failAction,
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

    create(){
        return{
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload:{
                        name: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(100)
                    }
                }
            },
            handler : async (request) =>{

                try {
                    
                    const {name, poder} = request.payload
                    const result = await this.db.create({name, poder})
                    
                    return{
                        message : 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }

                } catch (error) {
                    console.log("Deu ruim", error)
                    return 'Internal Error!'
                }
            }
        }

    }


   
    
}

module.exports = HeroRoutes