# 🛒 Mini E-commerce - Teste Técnico Frontend

Aplicação de e-commerce desenvolvida como parte de um teste técnico, utilizando **React + TypeScript + TailwindCSS + Vite**.

O projeto simula um fluxo completo de loja virtual, incluindo autenticação, controle de usuários (admin/client), carrinho de compras e CRUD de produtos e usuários.

---

## 🚀 Tecnologias utilizadas

* React
* TypeScript
* Vite
* TailwindCSS
* React Router
* Context API
* LocalStorage (persistência mock)
* React Hot Toast
* Lucide Icons

---

## 📦 Funcionalidades

### 🔐 Autenticação e Autorização

* Login com usuários simulados
* Controle de acesso baseado em **roles**:

  * `admin`
  * `client`
* Proteção de rotas com PrivateRoute

---

### 👤 Usuário Cliente

* Visualizar produtos
* Adicionar ao carrinho
* Alterar quantidade
* Remover itens
* Visualizar total da compra
* Finalizar compra (mock)
* Histórico de pedidos
* Tema claro/escuro

---

### 🛠️ Usuário Admin

* Login administrativo
* CRUD de produtos:

  * Criar
  * Listar
  * Editar
  * Deletar
* CRUD de usuários:

  * Criar
  * Listar
  * Deletar

---

## ⚠️ Observação importante

A aplicação utiliza a API pública:

👉 https://fakestoreapi.com/

Porém, como ela é **read-only**, as operações de escrita (CRUD) são simuladas utilizando:

✔️ `localStorage`

Ou seja:

* A API é usada apenas para carregar os dados iniciais
* Todas as alterações são persistidas localmente no navegador

---

## 🔑 Contas de acesso

### 👨‍💼 Admin

```
username: mor_2314
password: 83r5^_
```

### 👤 Cliente

```
username: kevinryan
password: kev02937@
```

---

## 🧠 Arquitetura do Projeto

```
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── context/
 ├── hooks/
 ├── types/
 ├── routes/
```

### 📌 Destaques:

* Separação clara de responsabilidades
* Services para consumo de API
* Context API para estado global (Auth e Cart)
* Tipagem forte com TypeScript
* Organização escalável

---

## 🎨 UI/UX

* Layout responsivo (mobile, tablet, desktop)
* Dark Mode 🌙
* Feedback visual:

  * Loading skeleton
  * Toasts
  * Hover/animations
* Acessibilidade básica

---

## ⚙️ Como rodar o projeto

```bash
# Clonar repositório
git clone <URL_DO_REPO>

# Entrar na pasta
cd nome-do-projeto

# Instalar dependências
npm install

# Rodar projeto
npm run dev
```

A aplicação estará disponível em:
👉 http://localhost:5173

---

## 💡 Diferenciais implementados

* Persistência com localStorage simulando backend
* Controle de roles (admin/client)
* Dark mode funcional
* Feedback visual moderno
* Animações (ex: carrinho)
* Estrutura escalável
* Código limpo e organizado

---

## 📌 Possíveis melhorias futuras

* Integração com backend real
* Testes automatizados (Vitest)
* Uso de Zustand ou Redux
* Paginação de produtos
* Upload de imagens
* Dashboard admin mais completo

---

## 📄 Licença

Projeto desenvolvido apenas para fins de avaliação técnica.

---

## 👨‍💻 Autor

Darlison de Souza Silva
Desenvolvedor Full Stack
LinkedIn: https://www.linkedin.com/in/darlison-silva-86113a191

---
