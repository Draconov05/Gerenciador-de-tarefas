
<template>
    <div class="w-[100vw] h-[100vh]">
      <HeaderBar/>
      <!-- listgrid -->
       <div id="list" class="grid grid-cols-4 gap-4 p-5">
          <TaskCard v-for="(task, index) in LocalTasks" :key="index" :task="task" @modal_edit="openModelEdit = true"/>
       </div>
    </div>

    <Teleport to="body">
      <ModalGray :open="openModelEdit || openModelAdd" @close="closeModals">
        <ModalEdit v-if="openModelEdit"/>
        <ModalAdd v-else-if="openModelAdd"/>
      </ModalGray>
    </Teleport>

</template>  

<script >

import HeaderBar from "../../components/HeaderBar.vue";
import TaskCard from "../../components/TaskCard.vue";
import ModalGray from "@/components/ModalGray.vue";
import ModalAdd from "@/components/ModalAdd.vue";
import ModalEdit from "@/components/ModalEdit.vue";

import axios from "axios";

export default {
  name: "index_tasks",
  components: {
    HeaderBar,
    TaskCard,
    ModalGray,
    ModalAdd,
    ModalEdit
  },
  props: [],
  data() {
    return {
      LocalTasks: [],
      openModelEdit: false,
      openModelAdd: false,
      selectedTaskToEdit: ""
    }
  },
  mounted() {
    this.GetTasks()
  },
  methods: {
    async GetTasks() {
      axios.get("http://localhost:3000/assuntos").then( res => {
        this.LocalTasks = res.data;
      })
    },
    closeModals(){
      this.openModelAdd = false;
      this.openModelEdit = false;
    }
  }
}
</script>

<style scoped>
</style>