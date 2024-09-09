# Desafio Técnico de Programação: Aplicação de Gerenciamento de Assuntos com Integração de API Pública

## Descrição do projeto
  - Foi desenvolvida uma aplicação web full-stack para gerenciamento de tarefas, utilizando NestJS no backend e Vue.js no frontend. O banco de dados escolhido foi o MongoDB, garantindo flexibilidade e escalabilidade no armazenamento das informações. Além das funcionalidades de CRUD (criar, ler, atualizar e deletar tarefas), a aplicação também integra-se à API pública do IBGE (https://servicodados.ibge.gov.br/api/v3/noticias/) para exibir as últimas notícias relacionadas, oferecendo aos usuários informações complementares em tempo real.

## Instalação e execução
### Instalação
  - Esse projeto utiliza nodeJs [Link para download](https://nodejs.org/en/download/package-manager/current)
  - Para verificar se a instalação funcionou corretamente abra o console do seu computador de digite
    ```console
      npm -v 
    ```
  - Caso o retorno seja algo como um numero então a instalação funcionou corretamente
     ```console
      10.8.1
    ```

### Instalação de dependencias
  - Frontend
    ```console
    cd client-side && npm i 
    ```
  - Backend
    ```console
    cd Server-side && npm i 
    ``` 

### Execução
#### Utilize dois terminais diferentes.
  - Frontend
    ```console
    cd client-side && npm run serve
    ```
  - Backend
    ```console
    cd Server-side && npm start 
    ``` 

## Tecnologias e bibliotecas

### Frontend
  - A tecnologia utilizada para o frontend foi o [VueJs](https://vuejs.org)
    Junto com as bibliotecas:
      - [Moment.js](https://momentjs.com)
      - [vue-moment](https://www.npmjs.com/package/vue-moment)
      - [Vue Router](https://router.vuejs.org)
      - [Axios](https://axios-http.com/ptbr/docs/intro)
      - [HeadlessUI](https://headlessui.com)
      - [heroicons](https://heroicons.com)
      - [tailwindcss](https://tailwindcss.com)

### Backend
  - A tecnologia utilizada para o backend foi o [nestjs](https://nestjs.com)
    Junto com as bibliotecas:
      - [nestjs/axios](https://docs.nestjs.com/techniques/http-module)
      - [Axios](https://axios-http.com/ptbr/docs/intro)
      - [nestjs/mongoose](https://docs.nestjs.com/techniques/mongodb)
      - [mongoose](https://mongoosejs.com)
      - [uuid](https://www.npmjs.com/package/uuid)
      - [rxjs](https://rxjs.dev)
      - [nestjs/swagger](https://docs.nestjs.com/recipes/swagger)
      

## API Documentation
  Para acessar a documentação da api basta que enquanto estiver rodando a aplicação Backend acessar o caminho "/docs"