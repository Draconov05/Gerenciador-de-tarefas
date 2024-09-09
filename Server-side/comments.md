# Comentários
Esses comentários são para melhorar a codificação, não são eliminatórios para a vaga

- A separação dos módulos de link e assuntos foi muito boa.
- Poderia ter removido o Hello (Controller e Service)
- Poderia ter criado um módulo de conexão com o banco DatabaseModule não colocar
    - MongooseModule.forRoot, no módulo main
    - MongooseModule.forFeature, nos módulos complementares
- Cada módulo poderia ter suas separações de controller, services, interfaces, dtos, interfaces etc
    - Uso de arquivos index.ts para exportar o conteúdo das pastas

![image](https://github.com/user-attachments/assets/40f16458-ceaa-4e14-a1e8-d0173067227a)
- '@nestjs/swagger'
    - Uso das propriedades do ApiProperty
`
@ApiProperty({
    description: 'Chave do Perfil',
    enum: ProfileEnum,
    enumName: 'ProfileEnum',
    example: ProfileEnum.ADMIN,
    required: true,
  })
`
    - Uso de validações existenstes
        - 'class-validator'
    - Uso das propriedades do ApiBody
    - Uso das propriedades do ApiCreatedResponse
- Mongoose
    - o Schema tem a propriedade timestamp, é melhor usar o máximo que a biblioteca pode oferecer
    - https://mongoosejs.com/docs/timestamps.html
    - Faltou usar o today
        - ![image](https://github.com/user-attachments/assets/1f832420-548c-4439-8ab0-7cea8df78aa5)
    - o Prop usar as propriedades para required, description etc
- ESLINT
    - Criar mais regras para um código mais limpo  
