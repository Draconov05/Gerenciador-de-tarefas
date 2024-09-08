
<template>
    <div class="h-[10vh] w-full border-b px-5 flex items-center justify-between">
        <div>
            Gerenciador de tarefas
        </div>
        <div class="flex items-center">
            <input class="border rounded-md px-2" type="text" placeholder="procurar..." v-if="showSearch">
            <button @click="showSearch = !showSearch">

                <svg v-if="!showSearch"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
            </button>
        </div>
    </div>
</template>  

<script >
export default {
  props: [],
  data() {
    return {
        showSearch: false
    }
  }
}
</script>

<style scoped>
</style>