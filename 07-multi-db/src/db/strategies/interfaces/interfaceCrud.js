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

module.exports = ICrud;