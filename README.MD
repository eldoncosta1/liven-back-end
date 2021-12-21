# Avaliação Back-end Liven

Desenvolver uma API HTTP em Express.js (Typescript), com cadastro e controle de usuários.

## Especificações

### **Base de dados** 💾

Modele uma base de dados com registros de usuário e endereços. O relacionamento entre elas deve ser do tipo `1:N`, ou seja, cada usuário pode estar relacionado à vários endereços, mas cada endereço está relacionado à apenas um usuário.

- Pode utilizar a base de dados que preferir

### Autenticação 🔐

- Permitir que um usuário que já possui conta possa fazer login (gerar um token JWT).

    <aside>
    👉 **Tokens JWT**: Para a autenticação, utilizar Json Web Tokens

    </aside>

- Todos os endpoints (com exceção do Login e Criação de Usuário) devem ser autenticados, validando o token JWT e retornando apenas dados que o usuário possui autorização de receber.

### [**CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) de usuário** 👥

- Permitir que um usuário crie uma conta com dados pessoais.
- Permitir que o usuário consiga visualizar seus dados. Incluir na resposta a lista de endereços do usuário.
- Permitir que o usuário consiga alterar seus dados.
- Permitir que o usuário remova sua conta do sistema.

### [**CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) de endereços** 📫

- Permitir que um usuário crie um novo endereço.
- Permitir que o usuário consiga visualizar seus endereços criados

    <aside>
    👉 **Querystring e params**: Você também deve permitir o uso de querystring (ex: `GET [localhost:3000/user/address?country=BR](http://localhost:3000/user?idade=18)` para pegar todos os endereços cujo campo `country=BR`, e query params (ex: `GET localhost:3000/user/address/123`, para pegar o endereço de ID=123)

    </aside>

- Permitir que o usuário consiga alterar os dados de um endereço.
- Permitir que o usuário remova um endereço do sistema

### Testes automatizados ✅

- Criação de suite de testes automatizados para o repositório.

### Extra: Documentação 📃

- Documentação da API por Swagger