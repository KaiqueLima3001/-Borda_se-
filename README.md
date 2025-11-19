# Borda-Se 🧵

> Solução móvel para gestão inteligente de pedidos de bordados.

O **Borda-Se** é um aplicativo desenvolvido em **React Native** com **Expo**, focado em facilitar a comunicação e o gerenciamento de pedidos entre a empresa de bordados e seus clientes. O sistema implementa um controle de acesso robusto, diferenciando funcionalidades para Administradores e Clientes.

---

## 📱 Funcionalidades

### 🔐 Autenticação e Segurança
* **Login e Cadastro:** Suporte para usuários Pessoa Física (CPF) e Jurídica (CNPJ) com validação automática.
* **Recuperação de Senha:** Fluxo seguro para redefinição de credenciais.
* **Controle de Acesso (RBAC):** O sistema distingue automaticamente entre perfis `Admin` e `User`.
    * **Admin:** Acesso total para criar, editar e excluir pedidos. Visualização de todos os pedidos do sistema.
    * **User:** Interface simplificada. Visualiza apenas os seus próprios pedidos e status de progresso.

### 📦 Gestão de Pedidos
* **Listagem em Tempo Real:** Atualização automática da lista de pedidos após qualquer modificação.
* **CRUD Completo:** Criação, Leitura, Atualização e Exclusão de pedidos (exclusivo para Admin).
* **Status Visual:** Sistema de flags coloridas (Produção, Entregue, Cancelado) para fácil identificação.
* **Busca:** Filtro de pedidos por título em tempo real.

### 👤 Perfil de Usuário
* **Dados Pessoais:** Edição de informações cadastrais (Telefone, Gênero, Data de Nascimento).
* **Segurança:** Alteração de senha com verificação da senha antiga.
* **Avatar Dinâmico:** Geração automática de avatar com as iniciais do usuário.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e tipada:

* **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/).
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (para tipagem estática e segurança de código).
* **Back-end (BaaS):** [Firebase](https://firebase.google.com/).
    * **Firestore:** Banco de dados NoSQL para persistência de usuários e pedidos.
    * **Authentication:** Gerenciamento de identidade.
* **Arquitetura de Comunicação:**
    * Implementação de uma camada de serviço via **API REST** pura (`fetch`), consumindo diretamente os endpoints do Google Firestore e Identity Toolkit, garantindo leveza e controle total sobre as requisições HTTP.
* **Gerenciamento de Estado:**
    * **Context API:** Arquitetura descentralizada com `AuthContext` (sessão) e `ListContext` (dados de negócio).
* **Navegação:** React Navigation (Stack e Bottom Tabs) com controle de fluxo condicional (`AuthStack` vs `AppStack`).
* **Estilização:** Design System personalizado com tokens globais de Cores e Métricas.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado.
* Gerenciador de pacotes (NPM ou Yarn).
* Aplicativo **Expo Go** no celular ou um emulador Android/iOS configurado.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/KaiqueLima3001/-Borda_se-.git](https://github.com/seu-usuario/borda-se.git)
    cd borda-se
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Vá até `src/config/api.ts`.
    * Certifique-se de que sua `FIREBASE_WEB_API_KEY` e `FIREBASE_PROJECT_ID` estão configurados corretamente.

4.  **Inicie o projeto:**
    ```bash
    npx expo start
    ```

5.  **Abra no seu dispositivo:**
    * Escaneie o QR Code com o aplicativo Expo Go (Android) ou Câmera (iOS).

---

## 📂 Estrutura do Projeto

A arquitetura segue padrões de **Clean Code** e **Atomic Design** adaptado:
src/ 
├── components/ # Componentes reutilizáveis (Input, Button, Flag...) 
├── config/ # Configurações de API e Firebase 
├── context/ # Gerenciamento de Estado Global (Auth e List) 
├── global/ # Tokens de Design (Cores, Fontes, Métricas) 
├── pages/ # Telas da aplicação (Login, List, User...) 
├── routes/ # Configuração de Navegação (Stack e Tabs) 
└── assets/ # Imagens e ícones estáticos

---

## 👥 Autores

Projeto desenvolvido para a disciplina de [Programação Para Dispositivos Móveis em Android] da faculdade.

* **<a href="https://github.com/KaiqueLima3001">Kaique Lima:</a>** Full Stack, Integração de APIs, Lógica de Negócio e Segurança.
* **Patrick:** Front-end, UI Design e Componentização.
* **<a href="https://github.com/VitorLamoya">Vitor Lamoya:</a>** Back-end e Modelagem de Dados NoSQL.
* **<a href="https://github.com/phbarboza99">Pedro Henrique:</a>** Integrações Back-end e Comunicação REST.
* **Emanuel:** Navegação, Roteamento e UX Mobile.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
