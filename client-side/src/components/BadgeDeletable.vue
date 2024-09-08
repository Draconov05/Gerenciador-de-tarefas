
<template>
    <div :class="badgeClass" class="space-x-2">
      {{ value ?? "." }} 
      <div class="cursor-pointer flex justify-center" @click="$emit('delete',this.value)">
        <i class='bx bx-x bx-xs'></i>
      </div>

    </div>
</template>  

<script >
export default {
  props: ["tipo","value"],
  emits: ["delete"],
  data() {
    return {
    }
  },
  computed: {
    badgeClass(){
      switch (this.tipo) {

        case "pendente":
          return "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10";
        case "Em Progresso":
          return "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10";
        case "Concluído":
          return "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20";

        case "key":
          return "inline-flex items-center rounded-lg bg-white px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20";
      
        default:
          break;
      }
      
      return "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10";
    }
  }
}
</script>

<style scoped>
</style>