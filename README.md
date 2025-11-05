# Gym API

Uma API para uma aplicação de academia.

## Tecnologias

- Node.js
- Fastify
- Prisma
- Zod
- TypeScript
- Docker

## Começando

### Pré-requisitos

- Node.js
- Docker
- Docker Compose

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto. Você pode copiar o arquivo `.env.example`.
4. Adicione a seguinte variável de ambiente ao seu arquivo `.env`:
   ```
   DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
   ```
5. Inicie o banco de dados com o Docker Compose:
   ```bash
   docker-compose up -d
   ```
6. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

## Docker

O arquivo `docker-compose.yml` irá configurar e executar um container com o banco de dados PostgreSQL.

### Gerenciando o Banco de Dados com Prisma Studio

Para gerenciar o banco de dados, você pode usar o Prisma Studio. Para iniciá-lo, execute o seguinte comando:

```bash
npx prisma studio
```

Isso abrirá uma interface web no seu navegador onde você poderá visualizar e editar os dados do seu banco de dados.

## Executando a Aplicação

### Localmente

Para iniciar a aplicação em modo de desenvolvimento, execute:

```bash
npm run dev
```

Isso iniciará o servidor em `http://localhost:3333`.

### Com Docker

Para executar a aplicação com Docker, você precisará adicionar um serviço para a API no seu `docker-compose.yml`. No momento, o `docker-compose.yml` contém apenas o banco de dados.

## Comandos MongoDB Replica Set

Para verificar o status do replica set, você pode usar o seguinte comando:

```bash
docker exec -it mongo1 mongosh --eval "rs.status()"
```

### Testando a Replicação

Você pode testar a replicação de dados inserindo um documento em um nó e verificando se ele aparece nos outros.

1.  **Acesse o `mongo1`:**

    ```bash
    docker exec -it mongo1 mongosh
    ```

2.  **Dentro do `mongosh`, crie um banco de dados e uma coleção, e insira um documento:**

    ```javascript
    use myNewDB
    db.createCollection("users")
    db.users.insertOne({ name: "Gilson", email: "gilson@example.com" })
    db.users.find()
    ```

3.  **Saia do `mongo1` e acesse o `mongo2` para verificar se os dados foram replicados:**

    ```bash
    docker exec -it mongo2 mongosh
    ```

4.  **Dentro do `mongosh` do `mongo2`, verifique os dados:**

    ```javascript
    use myNewDB
    db.users.find()
    ```

5.  **Faça o mesmo para o `mongo3`:**

    ```bash
    docker exec -it mongo3 mongosh
    ```

6.  **Dentro do `mongosh` do `mongo3`, verifique os dados:**

    ```javascript
    use myNewDB
    db.users.find()
    ```