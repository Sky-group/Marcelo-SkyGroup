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
            handler: (request, headers) => {
                try {
                    
                    const {skip, limit, name} = request.query

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

                    return this.db.read( query, parseInt(skip), parseInt(limit));
                    
                } catch (error) {
                   console.log('Deu ruim no servidor', error);
                   return "Erro interno no servidor"
                }
            }
        }
    }
   
    
}

module.exports = HeroRoutes