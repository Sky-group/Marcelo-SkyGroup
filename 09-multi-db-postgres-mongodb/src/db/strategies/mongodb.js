const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose');

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor() {
        super();
        this._herois = null;
        this._driver = null;
    }
    async isConnected() {
        const state = STATUS[this._driver.readyState];

        if(state === 'Conetado') return state;

        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve,1000));
        return STATUS[this._driver.readyState];

    }

    connected() {

        Mongoose.connect('mongodb://marcelocardoso:minhasenhasecreta@localhost:27017/heroes',
            { useNewParser: true }, function (error) {
                if (!error) return;

                console.log('Falha na conexão', error)
            });

        const connetion = Mongoose.connection;
        this._driver = connetion;
        connetion.once('open', () => console.log('database rodando !'));
        this.defineModel();

    }

    defineModel() {
       const heroiSchema  = Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        });

        this._herois = Mongoose.model('heroes', heroiSchema)
    }

     create(item) {
        
       return  this._herois.create(item);
       

        }

     read(item){
         return this._herois.find(item)
     }

     update(id, item){
         return this._herois.updateOne({_id:id},{$set:item});
     }

}

module.exports = MongoDB;   