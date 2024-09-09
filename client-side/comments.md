# Comentários
Esses comentários são para melhorar a codificação, não são eliminatórios para a vaga
- A ideia do Badge bem interessante
- 
- Poderia ter incluido o ESLINT
- O array das rotas poderia estar em um arquivo separado, para não misturar as coisas
- Poderia ter criado uma camada de serviço para no arquivo Vue não tenha chamada para uma URL diretamente
- Poderia ter um arquivo de Fixtures ou Contants ou Enum por conta da replicação de strings iguais
- A pasta components poderia ter pastas separando cada componente, se ele faz parte da header, da task, da modal ou compartilhado
- Nomenclatura dos arquivos misturado inglês e português
- Algumas duplicações de código
    - Exemplo: this.$moment(this.localTask.dataCriacao).locale('pt-br').format('L')
    - Poderia ter sido criado um arquivo DataTransformation com um método estático para realizar a transformação
