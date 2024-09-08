
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
                <SelectItems class="w-full" @select="selectLink" :options="noticias" :selected="localTask.link"></SelectItems>
            </div>
            <div class="mt-1">
                <button class="text-sm rounded-lg text-green-400 bg-green-100 px-2 py-1">Salvar</button>
            </div>
        </div>
        
    </div>
</template>  

<script >

import SelectItems from './SelectItems.vue';
import axios from "axios";

export default {
  props: [],
  components: {
    SelectItems
  },
  data() {
    return {
        localTask: {
            titulo: "",
            status: "Pendente",
            tags: "",
            link: ""
        },
        options: [
          { value: 'Pendente', text: 'Pendente' },
          { value: 'Em Progresso', text: 'Em Progresso' },
          { value: 'Concluido', text: 'Concluido' },
        ],
        noticias: []
    }
  },
  methods: {
    getTask(){

    },
    selectStatus(event){
        this.localTask.status = event
    },
    selectLink(event){
        this.localTask.link = event
    },
    GetNoticias(){
        axios.get("http://localhost:3000/assuntos/noticias").then( res => {
            this.noticias = res.data;
        })
    }
  }
}
</script>

<style scoped>
</style>