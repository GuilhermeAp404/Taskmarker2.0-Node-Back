
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

## Documentação da API - Rotas de Tarefa

### Rota para criar tarefas:
```http
  POST /tasks/create
```

Essa rota é utilizada para criar novas, as informações necessárias no corpo da requisição são:
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. Título de tarefa|
| `description`      | `string` | **Obrigatório**. Texto descrevendo a tarefa|
| `start`      | `DATETIME` | **Obrigatório**. Data e hora de início da tarefa|
| `end`      | `DATETIME` | **Obrigatório**. Data e hora de término  da tarefa|

```
{
    "title":"",
    "description":"",
    "start":"",
    "end":""
}
```
**Atenção: Para utilizar esta rota, o usuário deve estar autenticado. O token retornado pela rota de login deve ser enviado no cabeçalho da requisição.**

### Rota para trazer todas as tarefas do usuário:

```http
  GET /tasks/all
```
Essa rota busca todas as tarefas ligadas a um usuário.

**Atenção: Para utilizar esta rota, o usuário deve estar autenticado. O token retornado pela rota de login deve ser enviado no cabeçalho da requisição.**


### Rota para atualizar tarefas:
```http
  PUT /tasks/:id
```
Essa rota é atualizar para deletar tarefas de acordo com o ID enviado no parâmetro da requisição, o corpo pode receber:

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` |Título de tarefa|
| `description`      | `string` |Texto descrevendo a tarefa|
| `start`      | `DATETIME` |Data e hora de início da tarefa|
| `end`      | `DATETIME` |Data e hora de término  da tarefa|

```
{
    "title":"",
    "description":"",
    "start":"",
    "end":""
}
```
**Atenção: Para utilizar esta rota, o usuário deve estar autenticado. O token retornado pela rota de login deve ser enviado no cabeçalho da requisição.**

### Rota para deletar tarefas:
```http
  DELETE /tasks/:id
```

Essa rota é utilizada para deletar tarefas de acordo com o ID enviado no parâmetro da requisição. 

**Atenção: Para utilizar esta rota, o usuário deve estar autenticado. O token retornado pela rota de login deve ser enviado no cabeçalho da requisição.**

