# Desafio Técnico de Programação: Aplicação de Gerenciamento de Assuntos com Integração de API Pública

## Descrição Geral
Crie uma aplicação web full-stack para gerenciamento de tarefas utilizando TypeScript. 
O backend deve ser desenvolvido com Nest.JS e o frontend pode ser implementado com Angular, React ou Vue. 
A aplicação deve permitir aos usuários criar, ler, atualizar e deletar tarefas, armazenando essas informações em uma base de dados. 
Além disso, a aplicação deve integrar-se com uma API pública para exibir informações complementares relacionadas às tarefas.

## Requisitos Técnicos
### Backend
- Typescript com Nest.JS

#### Banco de Dados
- Utilize um banco de dados relacional (como PostgreSQL ou MySQL) ou NoSQL (como MongoDB).
- Configure a conexão com o banco de dados escolhido utilizando TypeORM, Sequelize ou Mongoose.

#### Entidades e Módulos:
- Assunto:
  - Campos: id (UUID), titulo (string), palavras-chaves (string), status (enum: Pendente, Em Progresso, Concluído), dataCriacao (timestamp), dataAtualizacao (timestamp).
  - Crie os módulos, controladores e serviços necessários para operações CRUD nas tarefas.
- Links:
  - Campos: id (UUID), link (string), AssuntoId (UUID)

#### Integração com API Pública:
- Selecione uma API pública relevante (exemplos: API de Notícias - https://api.gdeltproject.org/api/v1/search_ftxtsearch/search_ftxtsearch).
- Pode usar outra API
- Implemente um serviço no Nest.JS que realiza requisições à API pública para obter dados que complementem as tarefas (por exemplo, notícias relacionadas ao tema da tarefa).

### Frontend (Angular/React/Vue)
- Crie as seguintes telas
  - Dashboard de Tarefas
  - Listagem de tarefas com opções para criar, editar, atualizar status e deletar.
  - Formulário para criação e edição de tarefas.
  - Página para exibir as notícias relacionadas as palavras chaves do Assunto

#### Integração com Backend:
Exiba informações adicionais obtidas da API pública relacionada aos assuntos (por exemplo, notícias recentes sobre o tema da tarefa ou condições climáticas se a tarefa for ao ar livre).

## Funcionalidades Detalhadas
Gerenciamento de Assuntos:
- Criar Assunto: Permite ao usuário adicionar um novo assunto com título, palavras chaves e status inicial.
- Listar Assuntos: Exibe todas os assuntos existentes com opções para editar ou deletar.
- Atualizar Assunto: Permite modificar os detalhes de um assunto existente.
- Deletar Assunto: Remove um assunto da base de dados.
- Procurar Assunto: Procurar notícias sobre esse assunto.

### Procurar Assunto:
- Procurar de forma assincrona
- Usar o status para manter esse controladores
- Após Concluído, não pode mais capturar novas notícias

## Validações
Implementar validações de dados tanto no frontend quanto no backend.

## Requisitos de Entrega
Código Fonte:
- Crie um repositório no GitHub e nos forneça acesso para que possamos revisar 

Documentação:
- README.md detalhando:
  - Descrição do projeto.
  - Instruções de instalação e execução para backend e frontend.
  - Configuração de variáveis de ambiente (especialmente para chaves da API pública).
  - Tecnologias e bibliotecas utilizadas.
  - API Documentation (pode ser com Swagger ou similar) detalhando os endpoints disponíveis.

## Nice to Have
- Código limpo, organizado e bem estruturado.
- Uso adequado de TypeScript com tipagem correta.
- Boas práticas de programação e padrões do Nest.JS e do framework de frontend escolhido.
- Clareza e completude da documentação.
- Facilita a configuração e execução do projeto por terceiros.
- Testes: Incluir testes unitários e de integração para componentes críticos tanto no backend quanto no frontend.

## Prazo
O desafio deve ser concluído em até 5 dias corridos após o envio da mensagem.
