# Plataforma de Controle de Despesas Mensais — Front-end

## Descrição

Este repositório contém o **front-end** do projeto desenvolvido como **Trabalho de Conclusão de Curso (TCC)** da pós-graduação em Desenvolvimento Fullstack, pela PucRS.  
O sistema consiste em uma **plataforma para controle de despesas mensais**, permitindo que o usuário visualize, organize e gerencie seus gastos de forma clara, intuitiva e eficiente.

O front-end é responsável por:

- Fornecer a interface gráfica da aplicação
- Consumir a API REST disponibilizada pelo back-end
- Gerenciar estados e interações do usuário
- Exibir listagens, filtros e gráficos de despesas
- Garantir uma boa experiência de uso (UX)

A aplicação foi desenvolvida utilizando **React**, **TypeScript** e **Vite**, priorizando performance, organização de código e boas práticas no desenvolvimento de aplicações web modernas.

---

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
    - [Dependências](#dependências)
    - [Configuração do Ambiente](#configuração-do-ambiente)
    - [Docker e Docker Compose](#docker-e-docker-compose)
- [Execução](#execução)
    - [Desenvolvimento](#desenvolvimento)
    - [Produção](#produção)
- [Considerações Finais](#considerações-finais)

---

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Node.js
- HTML5
- CSS3

---

## Instalação

### Dependências

1. Instale as dependências básicas do sistema:

```bash
sudo apt update
sudo apt install -y curl git
```

2. Instalação do Node.js:

Recomenda-se a utilização da versão LTS do Node.js.

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

### Configuração do Ambiente

1. Clone do repositório:

```bash
git clone https://github.com/CaioslppUO/finances-frontend
```

2. Instalação das dependências:

```bash
cd finances-frontend
npm install
```

3. Crie um arquivo .env, com as seguintes configurações:

Preencha aqui a URL do backend.

```bash
VITE_API_URL=
```

### Docker e Docker Compose

1. Limpar o ambiente.

```bash
sudo apt remove docker docker-engine docker.io containerd runc
```

2. Instalar dependências.

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

3. Adicionar e configurar chaves.

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

4. Instalar docker e docker compose.

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

5. Adicionar usuário ao grupo do docker.

```bash
sudo usermod -aG docker $USER
```

## Execução

### Desenvolvimento

1. Executar em modo de desenvolvimento.

```bash
npm run dev
```

### Produção

1. Executar o container docker.

```bash
docker compose up -d
```

## Considerações Finais

Este projeto foi desenvolvido com fins acadêmicos, como parte do Trabalho de Conclusão de Curso (TCC) da pós-graduação, aplicando conceitos de desenvolvimento front-end moderno, consumo de APIs REST, componentização, tipagem estática com TypeScript e boas práticas de usabilidade e organização de código.

Autor: Caio Cezar das Neves Moreira
