# 🚀 Projeto NestJS GraphQL API

Este projeto é uma **API** desenvolvida em [NestJS](https://nestjs.com/) utilizando:

- GraphQL (Apollo)
- Prisma ORM
- SQLite
- JWT (JSON Web Token) para autenticação
- UUID como identificador
- bcrypt para senhas seguras

---

## 📁 Estrutura


```
src/
auth/ # autenticação (registro, login, JWT)
prisma/ # client do prisma + migrations
post/ # CRUD de posts
comment/ # CRUD de comentários
``` 


## 🛠 Tecnologias

- **NestJS** 10+
- **GraphQL Code First** (type-graphql)
- **Prisma ORM**
- **SQLite** (mas você pode migrar para PostgreSQL facilmente)
- **JWT** para autenticação
- **bcrypt** para hashing de senha
- **Apollo Server**

## ⚙️ Como rodar

```bash
# instale as dependências
npm install

# gere o client prisma
npx prisma generate

# rode as migrations
npx prisma migrate dev

# suba o servidor
npm run start:dev