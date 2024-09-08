
<template>
    <div class="w-[100vw] h-[100vh]">
      <HeaderBar/>
      <!-- listgrid -->
       <div id="list" class="grid grid-cols-4 gap-4 p-5">
          <TaskCard v-for="(task, index) in LocalTasks" :key="index" :task="task" @modal_edit="OpenModalEdit($event)"/>
          <CreateCard @modal_add="showModelAdd = true"/>
       </div>
    </div>

    <ModalGray :open="openModal" @close="closeModals()">
      <ModalEdit v-if="showModelEdit" :task="selectedTaskToEdit" @changed="GetTasks" @close="closeModals()"/>
      <ModalAdd v-else-if="showModelAdd" @changed="GetTasks" @close="closeModals()"/>
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
  name: "index_tasks",
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
      selectedTaskToEdit: ""
    }
  },
  computed: {
    openModal(){
      return this.showModelEdit || this.showModelAdd;
    }
  },
  mounted() {
    this.GetTasks()
  },
  methods: {
    async GetTasks() {
      console.log("Tasks Loading")
      axios.get("http://localhost:3000/assuntos").then( res => {
        this.LocalTasks = res.data;
      })
    },
    closeModals(){
      this.showModelAdd = false;
      this.showModelEdit = false;
    },
    OpenModalEdit(event){
      this.selectedTaskToEdit = event
      this.showModelEdit = true
    }
  }
}
</script>

<style scoped>
</style>