// npm install hapi
// npm i vision inert hapi-swagger
// npm i hapi-auth-jwt2
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const HapiJwt = require('hapi-auth-jwt2')
const Jwt_SECRET = 'MEU_SEGREDO_123'
const app = new Hapi.Server({
    port:5000

});

function mapRoutes (instance, methods) {
    return methods.map(method => instance[method]())
}

async function main(){
    const connection = MongoDb.connected();
    const context = new Context(new MongoDb(connection,HeroiSchema));

    const swaggerOption = {
        info:{
            title: 'API Herois - #CursoNodeBr',
            version: '1.0'
        },
        lang: 'pt'
    }
    
    await app.register([
        HapiJwt,
        Vision,
        Inert ,
        {
            plugin: HapiSwagger,
            options: swaggerOption
        }
    ])


    app.auth.strategy('jwt','jwt',{
        key: Jwt_SECRET,
        validate: (dado, request)=>{

            return{
                isValid : true
            }
        }
    })
    
    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(Jwt_SECRET), AuthRoutes.methods())
    ]
    )

    await app.start();
    console.log("Servidor rodando na porta : ", app.info.port);

    return app;
}

module.exports = main();