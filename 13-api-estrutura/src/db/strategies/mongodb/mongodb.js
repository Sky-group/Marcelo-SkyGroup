const ICrud = require('./../interfaces/interfaceCrud');
const Mongoose = require('mongoose');

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor(connection, schema) {
        super();
        this._schema = schema;
        this._connection = connection;
    }
    async isConnected() {
        const state = STATUS[this._connection.readyState];

        if(state === 'Conetado') return state;

        if(state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve,1000));
        return STATUS[this._connection.readyState];

    }

   static connected() {

        Mongoose.connect('mongodb://marcelocardoso:minhasenhasecreta@localhost:27017/heroes',
            { useNewParser: true }, function (error) {
                if (!error) return;

                console.log('Falha na conexão', error)
            });

        const connetion = Mongoose.connection;
        connetion.once('open', () => console.log('database rodando !'));
        return connetion;

    }

    
     create(item) {
        
       return  this._schema.create(item);
       

        }

     read(item){
         return this._schema.find(item);
     }

     update(id, item){
         return this._schema.updateOne({_id:id},{$set:item});
     }

     delete(id){
         return this._schema.deleteOne({_id: id});
     }

}

module.exports = MongoDB;   