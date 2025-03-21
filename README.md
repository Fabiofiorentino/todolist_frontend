# 🚀 Frontend do Desafio - Task Manager

Este é o frontend de um sistema de gerenciamento de tarefas, desenvolvido com **Next.js**, **TypeScript** e **Bootstrap**. A aplicação permite aos usuários autenticados criar, listar e gerenciar tarefas.

## 📌 Tecnologias Utilizadas

- **Next.js** - Framework React para SSR e SSG
- **TypeScript** - Tipagem estática para maior segurança no código
- **Bootstrap** - Estilização responsiva
- **React Bootstrap** - Componentes prontos para UI
- **Axios** - Requisições HTTP para a API backend

---

---

## 🛠️ Como Executar o Projeto

### 1️⃣ Clone o repositório
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

### 2️⃣ Instale as dependências

npm install
# ou
yarn install

### 🔐 Autenticação
A autenticação é baseada em JWT. Após o login bem-sucedido, um token é armazenado no localStorage, permitindo acesso às rotas protegidas.

Rotas públicas: /login, /register
Rotas protegidas: /tasks

