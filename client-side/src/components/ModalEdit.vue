
<template>
    <div class="h-[45vh] w-full border px-5 flex items-center justify-between overflow-y-auto">
        <div class="flex flex-col h-full space-y-2 w-full justify-center">
            <div class="flex flex-col">
                <label for="titulo">Titulo: </label>
                <input class="border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" name="titulo" type="text" v-model="localTask.titulo">
            </div>
            <div class="flex flex-col">
                <label for="status">Status: </label>
                <SelectItems @select="selectStatus" :options="options" :selected="localTask.status"></SelectItems>
            </div>
            <div class="flex flex-col">
                <label for="palavraChave">Tags: </label>
                <input class="border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" name="palavraChave" type="text" v-model="localTask.tags">
            </div>
            <div class="flex flex-col">
                <label for="link">Link:</label>
                <textarea class="border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm w-full" name="link" type="text" v-model="localTask.link"/>
            </div>
            <div class="mt-1">
                <button class="text-sm rounded-lg text-green-400 bg-green-100 px-2 py-1">Salvar</button>
            </div>
        </div>
        
    </div>
</template>  

<script >

import SelectItems from './SelectItems.vue';

export default {
  props: ["task"],
  components: {
    SelectItems
  },
  data() {
    return {
        localTask: {
            _id: this.task._id,
            titulo: this.task.titulo,
            status: this.task.status,
            tags: this.task.palavrasChaves,
            link: this.task.link.length > 0 ? this.task.link[0].link : ""
        },
        options: [
          { value: 'Pendente', text: 'Pendente' },
          { value: 'Em Progresso', text: 'Em Progresso' },
          { value: 'Concluido', text: 'Concluido' },
        ]
    }
  },
  methods: {
    getTask(){

    },
    selectStatus(event){
        this.localTask.status = event
    }
  }
}
</script>

<style scoped>
</style>