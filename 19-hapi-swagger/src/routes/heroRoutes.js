const Joi = require('joi')
const Boo = require('boom')
const failAction = (request,headers, erro) =>{
    throw erro;
}
const BaseRoute = require('./base/baseRoute');
const Boom = require('boom');


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
                tags:['api'],
                description:'Deve listar Herois',
                notes:'pode paginar resultados e filtrar por nome',
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
                   return Boom.internal()
                }
            }
        }
    }

    create(){
        return{
            path: '/herois',
            method: 'POST',
            config: {
                tags:['api'],
                description:'Deve cadastrar Herois',
                notes:'deve cadastrar Herois por nome e poder',
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
                    return Boom.internal()
                }
            }
        }

    }

    update(){
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags:['api'],
                description:'Deve atualizar Herois',
                notes:'deve atualizar qualquer campo passando o id',
                validate : {
                    params:{
                        id: Joi.string().required()
                    },
                    payload:{
                         name: Joi.string().min(3).max(100),
                         poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) =>{
                try {

                    const {id} = request.params;
                    const {payload} = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const  result = await this.db.update(id,dados)
                    
                    if (result.nModified !== 1) return Boom.preconditionFailed('Id não encontrado no banco!')
                    return {
                        message : 'Heroi atualizado com sucesso!'
                    }
                    
                } catch (error) {
                    console.error('DEU RUIM!', error)
                    return Boom.internal()
                }
            }
        }
    }

    delete(){
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags:['api'],
                description:'Deve remover Herois',
                notes:'o id deve ser valido',
                validate:{
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },

            handler:async (request)=>{

                try {
                    const {id} = request.params
                    const result = await this.db.delete(id)

                    if(result.n !== 1)
                      return Boom.preconditionFailed('Id não encontrado no banco!')

                    return {
                        message: 'Heroi removido com sucesso!'
                    }


                } catch (error) {
                    console.log('Deu ruim', error)
                    return Boom.internal()
                }
            }
        }
    }
   
    
}

module.exports = HeroRoutes