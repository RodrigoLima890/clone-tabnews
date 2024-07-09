# DeveWiki

## Hospedado pela Vercel em: https://devewiki.com.br (Em Construção)

DeveWiki será um fórum de discussões sobre tecnologia.

# Sobre O Projeto (Em Construção)

## Vercel

A vercel esta fazendo o Deploy automatico desse código

## Next.js 13

Este é um projeto full stack que aproveita ao máximo as qualidades e funcionalidades do Next.js 13, oferecendo uma experiência de desenvolvimento robusta e eficiente.

## Jest

Os testes unitários e de integração serão realizados utilizando o Jest, garantindo a confiabilidade e qualidade do código através de testes automatizados.

## Banco

Estou usando o banco de dados relacional postgreSql. estou subindo ele a partir de sua imagem com o docker compose usando o comando no package.json(npm run services:up⬆️)

## Aplicação API First

A aplicação será desenvolvida seguindo a abordagem API First. Isso significa que a API será desenvolvida primeiro, garantindo que todos os recursos e endpoints estejam disponíveis antes do desenvolvimento do front-end que irá consumi-la.

## Ganhos ao Usar o design API FIsrt

### 1. Clareza e Consistência

    - Documentação Detalhada: A API é projetada e documentada desde o início, proporcionando uma referência clara para todos os desenvolvedores envolvidos no projeto.
    - Contratos Bem Definidos: A API define contratos claros entre o front-end e o back-end, reduzindo ambiguidades e mal-entendidos.

### 2. Desenvolvimento Paralelo

    - Independência de Equipes: Equipes de front-end e back-end podem trabalhar de forma independente e em paralelo, acelerando o tempo de desenvolvimento.
    - Simulação de Endpoints: O front-end pode usar mockups da API para começar o desenvolvimento antes que o back-end esteja completamente implementado.

### 3. Reutilização e Flexibilidade

    - Reutilização de Serviços: Uma API bem projetada pode ser reutilizada em diferentes projetos e aplicações, aumentando a eficiência e reduzindo redundâncias.
    - Facilidade de Integração: Facilita a integração com outras plataformas e serviços, aumentando a interoperabilidade do sistema.

### 4. Escalabilidade e Manutenção

    - Evolução Independente: Permite que a API evolua independentemente do front-end, facilitando a implementação de novas funcionalidades sem a necessidade de grandes refatorações.
    - Manutenção Simplificada: A separação clara entre front-end e back-end simplifica a identificação e correção de problemas, melhorando a manutenção a longo prazo.

### 5. Qualidade e Testabilidade

    - Testes Automatizados: Facilita a criação de testes automatizados para a API, garantindo que ela funcione corretamente e atendendo aos requisitos definidos.
    - Qualidade do Código: A abordagem API First incentiva boas práticas de design e desenvolvimento, resultando em um código de melhor qualidade.

### 6. Experiência do Usuário

    - Desempenho Aprimorado: APIs bem projetadas podem ser otimizadas para melhor desempenho, resultando em uma experiência de usuário mais rápida e responsiva.
    - Consistência de Dados: Garante que os dados apresentados aos usuários sejam consistentes e atualizados em tempo real

Atualmente, estou preparando o terreno para a implementação de uma camada robusta de CI (Continuous Integration) e CD (Continuous Deployment). aproveitando a infraestrutura da Vercel para deploys automáticos, assegurando um fluxo de desenvolvimento contínuo e ágil.

# O que é CI/CD (Resulmo)

## CI (Continuous Integration)

Continuous Integration é uma prática de desenvolvimento onde os desenvolvedores integram frequentemente suas mudanças de código ao repositório principal, geralmente várias vezes ao dia.
Cada integração é verificada por meio de testes automatizados para detectar erros rapidamente.

## CD (Continuous Deployment)

Continuous Deployment é uma extensão do Continuous Integration onde cada alteração de código que passa nos testes automatizados é automaticamente implantada em produção. Isso permite que novas funcionalidades, melhorias e correções cheguem aos usuários de maneira rápida e segura.

## Como foi feito o CI desse projeto?

Primeiro precisava estabilizar os comandos para subir o servidor o banco e rodar os testes. precisei criar esses dois arquivos para isso

### wait-for-postgres.js

Executa o comando `docker exec postgres-dev pg_isready --host localhost` até o processo do postgres esta pronto para receber conexões. usei o modulo npm `child_process`

### orchestrator.js

Usei o modulo `async-retry` para de forma recursiva validar se endpoint `http://localhost:3000/api/v1/status` esta retornando um status code de `200` antes de proceguir

### Implantação do CI

Utilizei o github actions para automatizar os testes antes de qualquer pull request. Atualmente só é possivel integrar um código com o projeto se e somente se ele passar em todos os testes antes.
na raiz do meu projeto foi criado a pasta .github e dentro dessa pasta um outro diretório chamado workflows que dentro dele temos um yaml com as ações que os jobs que o github actios vão rodar. Além disso foi especificado um gatilho.
