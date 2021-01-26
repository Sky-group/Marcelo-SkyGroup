class NotEmplementedException extends Error{
    constructor(){
        super("Not Emplemented Exception")

    }
}

class ICrud{
    create(item){
        throw new NotEmplementedException()
    }

    read(query){
        throw new NotEmplementedException();
    }
    update(id, item){
        throw new NotEmplementedException();
    }
    delete(id){
        throw new NotEmplementedException();
    }

}

class MongoDB extends ICrud{
    constructor(){
        super();
    }

    create(item){
        console.log("O item foi salvo em MongoDB");
    }

}

class Postrgres extends ICrud{
    constructor(){
        super()
    }

    create(item){
        console.log("O item foi salvo em Postgres");
    }
}

class ContextStrategy {
    constructor(strategy){
        this._database = strategy;
    }

    create(item){
        return this._database.create(item);
    }

    read(query){
        return this._database.read(query);
    }

    update(id, item){
        return this._database.update(id, item);
    }

    delete(id){
        return this._database.delete(id);
    }
}

const contexStrategyMongoDB = new ContextStrategy (new MongoDB());
contexStrategyMongoDB.create()

const contexTrategyPostgres = new ContextStrategy(new Postrgres());
contexTrategyPostgres.create();