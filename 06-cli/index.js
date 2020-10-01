const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]' ,"Nome do Heroi")
        .option('-p, --poder [value]',"Poder do Heroi")
        .option('-i, --id [value]',  "Id do heroi")

        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar herois")
        .option('-r, --remover [value]',"Remover heroi")
        .option('-a, --atualizar [value]', "Atualizar um heroi por id")

        .parse(process.argv)

        const heroi = new Heroi(Commander);
        try {

            if(Commander.cadastrar){
               delete heroi.id; 
               const resposta = await Database.cadastrar(heroi);
               if(!resposta){
                   console.error("Heroi não  cadastrado!")
                   return
               }
               console.log("Heroi cadastrado com sucesso!");
            }

            if(Commander.listar){

                const resposta = await Database.listar();
                console.log(resposta);
                return
            }

            if(Commander.remover){
                const resposta = await Database.remover(heroi.id);

                if(!resposta){
                    console.error("Não foi possivel deletar o heroi");
                    return 
                }
                console.log("Heroi deletado com sucesso");
            }

            if(Commander.atualizar){
                const idParaAtualizar = parseInt(Commander.atualizar);
                //remove todas as chaves que estiverem com underfined | null
                const dado = JSON.stringify(heroi);
                const heroiAtualizar = JSON.parse(dado);
                const resultado = await Database.atualizar(idParaAtualizar,heroiAtualizar);
                if(!resultado){
                    console.error("O Heroi não foi atualizado");
                }
                console.log("Heroi atualizado com sucesso")
            }
            
        } catch (error) {
           console.error("Não deu boa", error) 
        }

}

main();