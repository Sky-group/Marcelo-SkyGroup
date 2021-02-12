const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'Marcelo@Cardoso1234'
const HASH = '$2b$04$Gng7NfMIPYT4NjNSdODDTu6EVoYKIaQYba6Qy3N1A7KPxzCgiWA5q'
describe.only('UserHelper test suit', function(){
   
    it('Deve gerar um hash a partir de uma  senha', async () =>{
        const result = await PasswordHelper.hahsPassword(SENHA)
        
        assert.ok(result.length > 10)
    })


    it('Compara um hash com a sua senha', async ()=>{

        const result = await PasswordHelper.comparePassword(SENHA, HASH)

        assert.ok(result)
    })

})