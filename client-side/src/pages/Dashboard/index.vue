
<template>
    <div class="w-full h-[93vh]">
      <HeaderBar :noSearch="true"/>
      <!-- listgrid -->
       <div class="grid grid-cols-3 p-5 gap-6 h-[90vh]">
            <div class="border border-r w-full h-full rounded-lg p-2 space-y-2">
                <WidgetTasksGeneral v-if="LocalTasks.length > 0" :tasks="LocalTasks"></WidgetTasksGeneral>
                <WidgetTasksToday v-if="LocalTasks.length > 0" :tasks="LocalTasks"></WidgetTasksToday>
                <WidgetTasksChangedToday v-if="LocalTasks.length > 0" :tasks="LocalTasks"></WidgetTasksChangedToday>
            </div>
            <div class="border border-r w-full h-full rounded-lg p-2 space-y-2">
                <WidgetDatesTasksCreated  v-if="LocalTasks.length > 0" :tasks="LocalTasks"></WidgetDatesTasksCreated>
                <WidgetDatesTasksModificada  v-if="LocalTasks.length > 0" :tasks="LocalTasks"></WidgetDatesTasksModificada>
            </div>
            <div class="w-full h-full rounded-lg p-2 space-y-2">
                <div></div>
            </div>
       </div>
    </div>
</template>  

<script >

import HeaderBar from "../../components/HeaderBar.vue";
import WidgetTasksGeneral from "@/components/WidgetTasksGeneral.vue";
import WidgetTasksToday from "@/components/WidgetTasksToday.vue";
import WidgetTasksChangedToday from "@/components/WidgetTasksChangedToday.vue";
import WidgetDatesTasksCreated from "@/components/WidgetDatesTasksCreated.vue";
import WidgetDatesTasksModificada from "@/components/WidgetDatesTasksModificada.vue";

import axios from "axios";

export default {
  name: "DashboardIndex",
  components: {
    HeaderBar,
    WidgetTasksGeneral,
    WidgetTasksChangedToday,
    WidgetDatesTasksCreated,
    WidgetDatesTasksModificada,
    WidgetTasksToday
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
    SetDefaultStatus(status){
        this.statusDefault = status;
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