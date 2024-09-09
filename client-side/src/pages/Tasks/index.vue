<template>
  <div class="w-full h-[90vh]">
    <HeaderBar @search="GetTasks" />
    <!-- listgrid -->
    <div id="list" class="grid grid-cols-3 p-5">
      <div class="flex flex-col space-y-2 items-center">
        <div class="border rounded-md h-[6vh] w-[20vw] px-2 bg-gray-50 flex items-center justify-between cursor-pointer"
          @click="$emit('modal_add')">
          <span class="text-gray-400">Pendente</span>
          <span class="text-gray-400 text-md">{{ LocalTasksPendente.length }}</span>
        </div>
        <div class="flex flex-col space-y-2 overflow-y-auto">
          <TaskCard v-for="(task, index) in LocalTasksPendente" :key="index" :task="task"
            @modal_edit="OpenModalEdit($event)" @delete_confirm="OpenDeleteConfirm($event)" :isDashboard="true" />
          <CreateCard @modal_add="showModelAdd = true" @click="SetDefaultStatus('Pendente')" />
        </div>

      </div>
      <div class="flex flex-col space-y-2 items-center">
        <div
          class="border rounded-md h-[6vh] w-[20vw] px-2 bg-blue-50 flex items-center justify-between cursor-pointer space-x-2"
          @click="$emit('modal_add')">
          <span class="text-blue-400">Em Progresso</span>
          <span class="text-blue-400 text-md">{{ LocalTasksEmProgresso.length }}</span>
        </div>
        <div class="flex flex-col space-y-2 overflow-y-auto">
          <TaskCard v-for="(task, index) in LocalTasksEmProgresso" :key="index" :task="task"
            @modal_edit="OpenModalEdit($event)" @delete_confirm="OpenDeleteConfirm($event)" :isDashboard="true" />
          <CreateCard @modal_add="showModelAdd = true" @click="SetDefaultStatus('Em_Progresso')" />
        </div>
      </div>
      <div class="flex flex-col space-y-2 items-center">
        <div
          class="border rounded-md h-[6vh] w-[20vw] px-2 bg-green-50 flex items-center justify-between cursor-pointer space-x-2"
          @click="$emit('modal_add')">
          <span class="text-green-400">Concluído</span>
          <span class="text-green-400 text-md">{{ LocalTasksConcluido.length }}</span>
        </div>
        <div class="flex flex-col space-y-2 overflow-y-auto">
          <TaskCard v-for="(task, index) in LocalTasksConcluido" :key="index" :task="task"
            @modal_edit="OpenModalEdit($event)" @delete_confirm="OpenDeleteConfirm($event)" :isDashboard="true" />
          <CreateCard @modal_add="showModelAdd = true" @click="SetDefaultStatus('Concluido')" />
        </div>
      </div>

    </div>
  </div>

  <ModalGray :open="openModal" @close="closeModals()">
    <ModalEdit v-if="showModelEdit" :task="selectedTaskToEdit" @changed="GetTasks" @close="closeModals()" />
    <ModalAdd v-else-if="showModelAdd" @changed="GetTasks" @close="closeModals()" :status="statusDefault" />

    <div v-else-if="showDeleteConfirm"
      class="h-[20vh] bg-red-50 rounded-lg flex flex-col justify-center items-start p-5 space-y-2">
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

<script>

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
      LocalTasksPendente: [],
      LocalTasksEmProgresso: [],
      LocalTasksConcluido: [],
      showModelEdit: false,
      showModelAdd: false,
      showDeleteConfirm: false,
      selectedTaskToEdit: "",
      statusDefault: ""
    }
  },
  computed: {
    openModal() {
      return this.showModelEdit || this.showModelAdd || this.showDeleteConfirm;
    }
  },
  mounted() {
    this.GetTasks()
  },
  methods: {
    async GetTasks(search = null) {
      if (search) {
        axios.get("http://localhost:3000/assuntos?search=" + search).then(res => {
          this.LocalTasksPendente = res.data.filter(res => {
            return res.status == "Pendente"
          });
          this.LocalTasksEmProgresso = res.data.filter(res => {
            return res.status == "Em Progresso"
          });
          this.LocalTasksConcluido = res.data.filter(res => {
            return res.status == "Concluído"
          });
        })
      } else {
        axios.get("http://localhost:3000/assuntos").then(res => {
          this.LocalTasksPendente = res.data.filter(res => {
            return res.status == "Pendente"
          });
          this.LocalTasksEmProgresso = res.data.filter(res => {
            return res.status == "Em Progresso"
          });
          this.LocalTasksConcluido = res.data.filter(res => {
            return res.status == "Concluído"
          });
        })
      }

    },
    async deleteTask() {
      axios.delete("http://localhost:3000/assuntos/" + this.selectedTaskToEdit._id).then(() => {
        this.GetTasks();
        this.closeModals();
      })
    },
    SetDefaultStatus(status) {
      this.statusDefault = status;
    },
    closeModals() {
      this.showModelAdd = false;
      this.showModelEdit = false;
      this.showDeleteConfirm = false;
    },
    OpenModalEdit(event) {
      this.selectedTaskToEdit = event
      this.showModelEdit = true
    },
    OpenDeleteConfirm(event) {
      this.selectedTaskToEdit = event
      this.showDeleteConfirm = true
    },

  }
}
</script>

<style scoped></style>