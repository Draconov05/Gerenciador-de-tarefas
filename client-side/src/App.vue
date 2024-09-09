<template>
  <div class="flex items-center space-x-4 py-1" @click="home">
      <div class="flex items-center space-x-1 border rounded-full bg-gray-50 pr-2">
          <img class="h-14 w-14" src="https://i.ibb.co/T1fnF5X/logo.png" alt="" srcset="">
          <span class="font-sm">TaskGen</span>
      </div>
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/tarefas">Tarefas</RouterLink>
  </div>
  <router-view/>
</template>

<script>

export default {
  components: {
    
  },
  name: 'App',
}
</script>

<style>
</style>
