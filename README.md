
# TaskMarker (Back-end)

TaskMarker é uma aplicação organizacional criada com o intuito de ser uma ferramenta eficiente para organização de tarefas. O objetivo do TaskMarker é facilitar a gestão de tarefas e projetos, permitindo que os usuários mantenham um controle eficaz de suas atividades diárias.




## Tecnologias Utilizadas

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Documentação da API - Rotas de Usuário

### Rota de registro:
```http
  POST /user/register
```
Essa rota é utilizada para fazer o registro dos usuários. As informações a seguir devem ser enviadas no corpo da requisição:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome completo do usuário.|
| `username` | `string` | **Obrigatório**. Nome de usuário para login.|
| `email` | `string` | **Obrigatório**. E-mail de contato do usuário.|
| `password` | `string` | **Obrigatório**.  Senha usada para login|

```
{
    "name":"",
    "username": "",
    "email":"",
    "password": ""
}
```

### Rota de login:

```http
  POST /user/login
```
Essa rota é utilizada para fazer o login dos usuários. As informações a seguir devem ser enviadas no corpo da requisição:

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Obrigatório**. O nome de usuário enviado no registro|
| `password`      | `string` | **Obrigatório**. Senha utilizado no registro do usuário|


```
{
    "username": "",
    "password": ""
}
```

### Rota para trazer informações do usuário:
```http
  GET /user/update
```

Rota criada para trazer informações dos usuários.

**Atenção: Para utilizar esta rota, o usuário deve estar autenticado. O token retornado pela rota de login deve ser enviado no cabeçalho da requisição.**


### Rota de atualização de usuário:
```http
  PUT /user/update
```

Rota criada para atualizar informações dos usuários. As informações a seguir devem ser enviadas no corpo da requisição:

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` |O nome enviado para atualização|
| `username`      | `string` |O nome de usuário enviado para atualização|
| `email`      | `string` |O e-mail enviado para atualização|
| `password`      | `string` | **Obrigatório**. A senha do usuário e utilizada pra permitir a ação|
| `passwordConfirm`      | `string` | **Obrigatório**. A confirmação da senha é utilizada para permitir a ação|

**Atenção: Para utilizar esta rota, o usuário deve estar autenticado. O token retornado pela rota de login deve ser enviado no cabeçalho da requisição.**

```
{
    "name": "",
    "username": "",
    "email": "",
    "password": "",
    "passwordConfirm": ""
}
```

### Rota de para deletar de usuário:
```http
  DELETE /user/delete
```

Rota criada para atualizar informações dos usuários. As informações a seguir devem ser enviadas no corpo da requisição:

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `password`      | `string` | **Obrigatório**. A senha do usuário e utilizada pra permitir a ação|
| `passwordConfirm`      | `string` | **Obrigatório**. A confirmação da senha é utilizada para permitir a ação|

**Atenção: Para utilizar esta rota, o usuário deve estar autenticado. O token retornado pela rota de login deve ser enviado no cabeçalho da requisição.**

```
{
    "password": "",
    "passwordConfirm": ""
}
```


Recebe dois números e retorna a sua soma.

