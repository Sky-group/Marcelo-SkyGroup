const ICrud = require('./interfaces/interfaceCrud');
const Sequelize = require('sequelize');

class Postrgres extends ICrud{
    constructor(){
        super();
        this._driver = null;
        this._herois = null;
        
    }

    async defineModel(){
        this._herois = this._driver.define('heroes',{
            id:{
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome:{
                type: Sequelize.STRING,
                required: true
            },
            poder:{
                type: Sequelize.STRING,
                required: true 
            }
        },{
            tableName:'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
    
        await this._herois.sync();
    }
    async isConnected(){
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.error('fail', error)
        }
    }
    async connect(){
       this._driver = new Sequelize(
            'heroes',
            'marcelocardoso',
            'minhasenhasecreta',{
                host:'localhost',
                dialect:'postgres',
                quoteIdentifiers:false,
                operatorsAliases:false
            }
        
        )
        await this.defineModel();
    }
    async create(item){

        const {dataValues} = await this._herois.create(item);
        return dataValues;
    }

    async read(item = {}){
       return this._herois.findAll({where:{nome:item}, raw:true});
       
    }
}

module.exports = Postrgres;
