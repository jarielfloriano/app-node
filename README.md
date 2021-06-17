# REST API

This is REST API with NodeJS

## Requisitos
 - Node.js installed (https://nodejs.org/)
 - MongoDB (https://www.mongodb.com/)
 - Insomnia (https://insomnia.rest)
 - insomnia-plugin-default-headers (https://insomnia.rest/plugins/insomnia-plugin-default-headers)

## Instalação
 - `npm install`

## Usando
É interessante utilizar o plugin de headers padrão do insomnia para passar o token para todos os requests.
Veja como fazer isso em: https://github.com/kong/insomnia/tree/master/plugins/insomnia-plugin-default-headers

É necessário criar um usuário, utilizando a rota pública:
- POST /users com o payload:
```
firstName: "Jariel"
lastName: "Floriano"
email: "jariel.floriano@gmail.com"
password: "123456"
permissionLevel: 4
```

Para executar o projeto, utilize o comando:
 - `npm start`
