
<template>
    <div class="w-[100vw] h-[100vh]">
      <HeaderBar @search="GetTasks"/>
      <!-- listgrid -->
       <div id="list" class="grid grid-cols-4 gap-4 p-5">
          <TaskCard v-for="(task, index) in LocalTasks" :key="index" :task="task" @modal_edit="OpenModalEdit($event)" @delete_confirm="OpenDeleteConfirm($event)"/>
          <CreateCard @modal_add="showModelAdd = true"/>
       </div>
    </div>

    <ModalGray :open="openModal" @close="closeModals()">
      <ModalEdit v-if="showModelEdit" :task="selectedTaskToEdit" @changed="GetTasks" @close="closeModals()"/>
      <ModalAdd v-else-if="showModelAdd" @changed="GetTasks" @close="closeModals()"/>

      <div v-else-if="showDeleteConfirm" class="h-[20vh] bg-red-50 rounded-lg flex flex-col justify-center items-start p-5 space-y-2">
        <span class="text-red-600 font-md">
          Você tem certeza que dejesa deletar a tarefa "{{ selectedTaskToEdit.titulo }}" ?
        </span>
        <div class="space-x-2">
          <button class="text-sm rounded-lg text-red-400 bg-red-100 px-2 py-1" @click="deleteTask">Deletar</button>
          <button class="text-sm rounded-lg text-gray-400 bg-gray-100 px-2 py-1" @click="closeModals">Cancelar</button>
        </div>
      </div>
    </ModalGray>

</template>  

<script >

import HeaderBar from "../../components/HeaderBar.vue";
import TaskCard from "../../components/TaskCard.vue";
import ModalGray from "@/components/ModalGray.vue";
import ModalAdd from "@/components/ModalAdd.vue";
import ModalEdit from "@/components/ModalEdit.vue";
import CreateCard from "@/components/CreateCard.vue";

import axios from "axios";

export default {
  name: "IndexTasks",
  components: {
    HeaderBar,
    TaskCard,
    ModalGray,
    ModalAdd,
    ModalEdit,
    CreateCard
  },
  props: [],
  data() {
    return {
      LocalTasks: [],
      showModelEdit: false,
      showModelAdd: false,
      showDeleteConfirm: false,
      selectedTaskToEdit: ""
    }
  },
  computed: {
    openModal(){
      return this.showModelEdit || this.showModelAdd || this.showDeleteConfirm;
    }
  },
  mounted() {
    this.GetTasks()
  },
  methods: {
    async GetTasks(search = null) {
      if (search){
        axios.get("http://localhost:3000/assuntos?search="+search).then( res => {
          this.LocalTasks = res.data;
        })
      }else{
        axios.get("http://localhost:3000/assuntos").then( res => {
          this.LocalTasks = res.data;
        })
      }
      
    },
    async deleteTask(){
      axios.delete("http://localhost:3000/assuntos/"+this.selectedTaskToEdit._id).then( () => {
        this.GetTasks();
        this.closeModals();
      })
    },
    closeModals(){
      this.showModelAdd = false;
      this.showModelEdit = false;
      this.showDeleteConfirm = false;
    },
    OpenModalEdit(event){
      this.selectedTaskToEdit = event
      this.showModelEdit = true
    },
    OpenDeleteConfirm(event){
      this.selectedTaskToEdit = event
      this.showDeleteConfirm = true
    },
    
  }
}
</script>

<style scoped>
</style>