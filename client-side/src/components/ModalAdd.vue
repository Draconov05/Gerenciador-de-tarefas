
<template>
    <div class="h-[45vh] w-full border px-5 flex flex-col justify-center items-between overflow-y-auto py-5">
        <div class="mt-1 space-x-1 flex justify-between">
            <span>Criar nova tarefa</span>
            <div @click="$emit('close')" class="cursor-pointer">
                <i class='bx bx-x bx-xs'></i>
            </div>
        </div>
        <div class="flex flex-col h-full space-y-4 w-full justify-center">
            <div class="flex flex-col">
                <label for="titulo">Titulo: </label>
                <input class="border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" name="titulo" type="text" v-model="localTask.titulo">
            </div>
            <div class="flex flex-col">
                <label for="status">Status: </label>
                <SelectItems @select="selectStatus" :options="options" :selected="localTask.status"></SelectItems>
            </div>
            <div class="flex flex-col">
                <label for="palavraChave">Palavras Chave: </label>
                <!-- <input class="border w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm" name="palavraChave" type="text" v-model="localTask.tags"> -->
                <div class="space-x-1 overflow-x-auto">
                    <BadgeDeletable v-for="(keyWord, index) in localTagsArr" :key="index" :value="keyWord" tipo="key" @delete="removeFromTags"></BadgeDeletable>
                    <BadgeCreatable v-if="newTag" @save="saveNewTag" tipo="key" @delete="newTag = false"></BadgeCreatable>
                    <BadgeStatus tipo="key" class="cursor-pointer" @click="newTag = true">
                        <i class='bx bx-plus bx-sx text-gray-300'></i> 
                    </BadgeStatus>
                </div>
                
            </div>
            
        </div>
        <div class="mt-1 space-x-1">
            <button class="text-sm rounded-lg text-green-400 bg-green-100 px-2 py-1" @click="storeTask">Salvar</button>
        </div>
    </div>
</template>  

<script >

import SelectItems from './SelectItems.vue';
import BadgeDeletable from './BadgeDeletable.vue';
import BadgeCreatable from './BadgeCreatable.vue';
import BadgeStatus from './BadgeStatus.vue';

import axios from "axios";

export default {
  emits: ["changed","close"],
  components: {
    SelectItems,
    BadgeDeletable,
    BadgeCreatable,
    BadgeStatus
  },
  data() {
    return {
        localTask: {
            _id: "",
            titulo: "",
            status: "",
        },
        localTagsArr: [],
        newTag: false,
        options: [
          { value: 'Pendente', text: 'Pendente' },
          { value: 'Em_Progresso', text: 'Em Progresso' },
          { value: 'Concluido', text: 'Concluído' },
        ]
    }
  },
  methods: {
    getTask(){

    },
    selectStatus(event){
        this.localTask.status = event.value
    },
    removeFromTags(value){
        this.localTagsArr = this.localTagsArr.filter(el => {
            return el != value
        })  
    },
    saveNewTag(value){
        this.newTag = false
        this.localTagsArr.push(value)
    },
    async storeTask(){

        let KeyWords = this.localTagsArr.join(",")

        let data = {
            "titulo": this.localTask.titulo,
            "status": this.localTask.status,
            "palavrasChaves": KeyWords,
        }

        axios.post("http://localhost:3000/assuntos/", data).then( res => {
            this.LocalTasks = res.data;
            this.$emit("changed")
        }).catch(err => console.log(err))

    }
  }
}
</script>

<style scoped>
</style>