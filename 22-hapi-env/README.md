INSTALAÇÃO DO DOCKER NO LINUX MINT 20


Primeiramente iremos instalar as dependências necessárias, para isso execute os comandos abaixo:

 sudo apt-get update
 sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common

Agora importaremos a chave do pacote docker:

 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

Agora iremos adicionar o repositório do docker ao nosso sistema:

sudo add-apt-repository "deb https://download.docker.com/linux/ubuntu bionic stable"

Em seguida iremos atualizar a lista de pacotes:

 sudo apt-get update

Por fim, instalaremos o docker e o docker-compose:

 sudo apt-get -y install docker-ce docker-compose

Será necessário adicionar nosso usuário ao grupo do docker para não haver necessidade de utilização do "sudo".

 sudo usermod -aG docker $USER

Verificando a versão do docker instalado:

 docker --version
Docker version 19.03.13, build 4484c46d9d


************************************************************************************************************************************************************************************************************
********************************** COMANDOS DOCKER ***************************************************
##---POSTGRES

docker run \
    --name postgres \
    -e POSTGRES_USER=marcelocardoso \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps -- para listar quais os serviçoes que estão sendo executados
docker exec -it postgres /bin/bash


docker run \
    --name adminer\
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer 

##---MONGODB

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4


    docker run \
        --name mongoclient \
        -e MONGO_URL="mongodb://admin:senhaadmin@mongodb:27017/admin" \
        -p 3000:3000 \
        --link mongodb:mongodb \
        -d mongoclient/mongoclient

 
 docker exec -it mongodb \
    mongo --host localhost -u admin  -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user:'marcelocardoso',pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'heroes'}]})"