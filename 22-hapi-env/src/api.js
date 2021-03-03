// npm install hapi
// npm i vision inert hapi-swagger
// npm i hapi-auth-jwt2
// npm i bycrypt
const {config} = require('dotenv')
const { ok} = require('assert')
const {join } = require('path')

const env = process.env.NODE_ENV || "dev"

ok(env === "prod" || env === "dev", "a env é inválida, ou prod ou dev")

const configPath = join(__dirname, './config', `.env.${env}`)

config({
    path:configPath
})

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const Postgres = require('./db/strategies/postgres/postegre')
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const HapiJwt = require('hapi-auth-jwt2')
const Jwt_SECRET = process.env.JWT_KEY

const app = new Hapi.Server({
    port: process.env.PORT

});

function mapRoutes (instance, methods) {
    return methods.map(method => instance[method]())
}

async function main(){
    const connection = MongoDb.connected();
    const context = new Context(new MongoDb(connection,HeroiSchema));

    const connectionPostgres = await Postgres.connected()
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const contexPostgres = new Context(new Postgres(connectionPostgres,model))

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
        ...mapRoutes(new AuthRoutes(Jwt_SECRET, contexPostgres), AuthRoutes.methods())
    ]
    )

    await app.start();
    console.log("Servidor rodando na porta : ", app.info.port);

    return app;
}

module.exports = main();