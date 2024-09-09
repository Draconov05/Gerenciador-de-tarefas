
<template>
    <div class="h-[3.5vh] w-full border-b px-5 flex items-center" :class="[goBack ? 'justify-start' : 'justify-end']">
        <div @click="$router.push({name: goBack})" v-if="goBack" class="space-x-2 flex items-center cursor-pointer">
            <i class='bx bx-left-arrow-alt'></i>
            voltar
        </div>
        <div class="flex items-center" v-if="!noSearch">
            <input class="border rounded-md px-2" type="text" placeholder="procurar..." v-model="searchInput" v-if="showSearch" @keydown.enter="submit" >
            <button @click="showSearch = !showSearch">

                <i v-if="!showSearch" class='bx bx-search bx-sm' ></i>

                <i v-else @click="clearSearch" class='bx bx-x bx-sm' ></i>

            </button>
        </div>
    </div>
</template>  

<script >
export default {
  props: ["noSearch","goBack"],
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
        this.$router.push({ name: 'listagem'})
    },
  }
}
</script>

<style scoped>
</style>