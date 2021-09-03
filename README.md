## Descrição do projeto

Projeto desenvolvido para controle de gastos de múltiplos usuários, visando atender as requisições de diferentes maneiras, sejam elas feitas de por meio do roteamento padrão do Express, ou com GraphQL por meio do Apollo Server, ou até mesmo com postagem de mensagem em filas por meio do RabbitMQ.



## Tecnologias Utilizadas

- NodeJS
- Express
- GraphQL
- PostgresSQL
- RabbitMQ



## Como baixar e utilizar o projeto

```
# Clonar o Repositório
$ git clone https://github.com/RogerMKobus/controle-gastos

# Entrar no diretório
$ cd controle-gastos/api

# Instalar as dependências
$ yarn install

```



Após instalar as dependências preencha o arquivo .env_mirror com as informações necessárias e renomeado para apenas .env



```
# Inicie a aplicação
$ yarn dev
```



Após inicializar a aplicação, as seguintes rotas estarão disponíveis para receber as solicitações

- Requisição GET na rota /clientes => Retorna todos os clientes registrados e seus gastos
- Requisição GET na rota /clientes/:id => Retorna o cliente informado e seus gastos
- Requisição POST na rota /clientes => Cria novo cliente com os dados informados
- Requisição PUT na rota /clientes/:id =>  Atualiza os dados do cliente informado
- Requisição DELETE na rota /clientes/:id => Exclui o cliente informado
- Requisição GET na rota /clientes/filter/:startDate/:endDate/:id => Retorna os gastos realizados pelo cliente informado entre as datas informadas
- Requisição GET na rota /clientes/results/:mes/:ano/:id => Retorna a soma total de seus gastos e a média diária de gastos no mês informado



- Requisição GET na rota /gastos => Retorna todos os gastos registrados

- Requisição GET na rota /gastos/:id => Retorna o gasto informado

- Requisição POST na rota /gastos => Cria novo gasto com os dados informados

- Requisição PUT na rota /gastos/:id => Atualiza os dados do gasto informado

- Requisição DELETE na rota /gastos/:id => Exclui o gasto informado

  

A API atende requisições do GrapQL por meio do Apollo Server que é iniciado em uma porta diferente do express, portanto, após configura-la no arquivo .env, a aplicação estará esperando requisições na rota raiz da porta informada. 

A aplicação também esta consumindo as filas do RabbitMQ, e para exemplificar sua utilização, foram criadas rotas para enviar mensagens as filas, que ao receber estas mensagens a aplicação executa a função determinada.



- Requisição POST na rota /rabbit/clientes => Criar novo cliente

- Requisição PUT na rota  /rabbit/clientes => Atualizar cliente com id informado no req.body

- Requisição DELETE na rota  /rabbit/clientes => Excluir cliente com  id informado no req.body



- Requisição POST na rota /rabbit/gastos => Criar novo gasto

- Requisição PUT na rota  /rabbit/gastos => Atualizar gasto com id informado no req.body

- Requisição DELETE na rota  /rabbit/gastos => Excluir gasto com  id informado no req.body

