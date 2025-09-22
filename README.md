# Portfólio Interativo com IA - Do Céu ao Espaço

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Bem-vindo ao meu portfólio pessoal, uma aplicação web interativa que leva os visitantes numa viagem visual do céu diurno às profundezas do espaço. Este projeto não só exibe as minhas competências e projetos, mas também integra a API da Google Gemini para criar conteúdo dinâmico e personalizado.

**[Aceda à demonstração ao vivo]([https://SEU_LINK_AQUI.com](https://portfolio-web-six-flax.vercel.app))** 

---

## ✨ Funcionalidades Principais

* **Tema de Scroll Progressivo:** A interface transita suavemente de um céu diurno com nuvens para um céu noturno estrelado à medida que o utilizador rola a página.
* **Integração com IA (Google Gemini):**
  * **Biografia Dinâmica:** Permite reescrever a secção "Sobre Mim" em diferentes tons (Profissional, Criativo, Poético) com um único clique.
  * **Gerador de "Quebra-Gelo":** Cria frases criativas e contextuais para facilitar o primeiro contacto por email.
* **Design Moderno e Responsivo:** Construído com Tailwind CSS para uma experiência de utilização perfeita em qualquer dispositivo, do telemóvel ao desktop.
* **Animações e Efeitos Visuais:** Efeitos de paralaxe, estrelas cintilantes e um portal de contacto animado para criar uma experiência imersiva.
* **Facilmente Configurável:** Todos os dados pessoais, projetos e competências podem ser alterados num único objeto JavaScript, sem necessidade de tocar na lógica da aplicação.

---

## 🚀 Tecnologias Utilizadas

* **Frontend:** React, TypeScript, Vite
* **Estilização:** Tailwind CSS
* **IA Generativa:** Google Gemini API
* **Ícones:** Lucide React

---

## ⚙️ Configuração e Instalação Local

Para executar este projeto na sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/GtxSantos/Portfolio_Web.git](https://github.com/GtxSantos/Portfolio_Web.git)
    ```

2.  **Navegue para a pasta do projeto:**
    ```bash
    cd Portfolio_Web
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    * Crie um ficheiro chamado `.env` na raiz do projeto.
    * Adicione a sua chave da API da Google Gemini a esse ficheiro:
      ```
      VITE_GEMINI_API_KEY="SUA_CHAVE_DA_API_AQUI"
      ```

5.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

---
📬 Contacto
Gustavo Santos - gt.santosx04@gmail.com

Link do Projeto: https://github.com/GtxSantos/Portfolio_Web

## ✏️ Como Personalizar

Para personalizar o portfólio com as suas próprias informações, basta editar o objeto `portfolioData` que se encontra no topo do ficheiro `src/app.tsx`.

```javascript
const portfolioData = {
  name: "O Seu Nome",
  role: "O Seu Cargo",
  about: "A sua biografia...",
  profileImageUrl: "O link para a sua foto...",
  // ... e assim por diante
};



