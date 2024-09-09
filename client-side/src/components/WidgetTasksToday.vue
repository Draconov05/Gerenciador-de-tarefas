
<template>
    <div>
        <span>
            Tarefas criadas hoje ({{ $moment(new Date()).locale('pt-br').format('L') }}):
        </span>
        <div class="flex space-x-1">
            <div class="w-[45%] h-[10vh] border bg-gray-50 flex justify-center items-center rounded-lg">
                <span class="text-gray-400">
                    Pendentes: {{ LocalTasksPendente.length }}
                </span>
            </div>
            <div class="w-[45%] h-[10vh] border bg-blue-50 flex justify-center items-center rounded-lg">
                <span class="text-blue-400">
                    Em Progresso: {{ LocalTasksEmProgresso.length }}
                </span>
            </div>
            <div class="w-[45%] h-[10vh] border bg-green-50 flex justify-center items-center rounded-lg">
                <span class="text-green-400">
                    Concluídos: {{ LocalTasksConcluido.length }}
                </span>
            </div>
        </div>
    </div>
</template>  

<script >

export default {
  components: {
  },
  props: ["tasks"],
  data() {
    return {
      LocalTasksPendente: [],
      LocalTasksEmProgresso: [],
      LocalTasksConcluido: [],
    }
  },
  computed: {
  },
  mounted() {
    this.filterTasks()
  },
  methods: {
    filterTasks(){
        var today = this.$moment(new Date()).locale('pt-br').format('L');

        var totalToday = this.tasks.filter(res => {
            return this.$moment(res.dataCriacao).locale('pt-br').format('L') == today
        });

        this.LocalTasksPendente = totalToday.filter(res => {
            return res.status == "Pendente"
        });
        this.LocalTasksEmProgresso = totalToday.filter(res => {
            return res.status == "Em Progresso"
        });
        this.LocalTasksConcluido = totalToday.filter(res => {
            return res.status == "Concluído"
        });
    }
  }
}
</script>

<style scoped>
</style>