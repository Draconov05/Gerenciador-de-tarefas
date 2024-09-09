
<template>
    <div>
        <span>
            Tarefas modificadas por data:
        </span>
        <div class="flex space-x-1">
            <div v-for="(data, index) in DatesTasks" :key="index" class="w-[45%] h-[10vh] border bg-gray-50 flex justify-center items-center rounded-lg">
                <span class="text-gray-400">
                    {{data.date}}: {{ data.count }}
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
      DatesTasks: []
    }
  },
  computed: {
  },
  mounted() {
    this.filterTasks()
  },
  methods: {
    filterTasks(){
        this.tasks.map(res => {
            let data = this.$moment(res.dataAtualizacao).locale('pt-br').format('L')
            let find = this.DatesTasks.findIndex(el => {
                return el["date"] == data
            })

            if(find == -1){
                this.DatesTasks.push({
                    "date": data,
                    "count": 1
                });
                
            }else{
                this.DatesTasks[find].count++
            }
        });
    }
  }
}
</script>

<style scoped>
</style>