
<template>
    <div class="h-[10vh] w-full border-b px-5 flex items-center justify-between">
        <div class="cursor-pointer flex items-center space-x-2" @click="home">
            <img class="h-14 w-14" src="https://i.ibb.co/T1fnF5X/logo.png" alt="" srcset="">
            <span class="font-sm">TaskGen</span>
            <div @click="ShowList">
                Tarefas
            </div>
        </div>
        <div class="flex items-center">
            <input class="border rounded-md px-2" type="text" placeholder="procurar..." v-model="searchInput" v-if="showSearch" @keydown.enter="submit" >
            <button @click="showSearch = !showSearch">

                <i v-if="!showSearch" class='bx bx-search bx-md' ></i>

                <i v-else @click="clearSearch" class='bx bx-x bx-md' ></i>

            </button>
        </div>
    </div>
</template>  

<script >
export default {
  props: [],
  emits: ["search"],
  data() {
    return {
        showSearch: false,
        searchInput: ""
    }
  },
  methods: {
    home(){
        this.$router.push("/")
    },
    clearSearch(){
        this.searchInput = ""
        this.submit()
    },
    submit(){
        this.$emit("search",this.searchInput)
    },
    ShowList(){
        this.$router.replace({ name: 'listagem'})
    },
  }
}
</script>

<style scoped>
</style>