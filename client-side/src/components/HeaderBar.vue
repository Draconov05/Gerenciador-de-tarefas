
<template>
    <div class="h-[10vh] w-full border-b px-5 flex items-center justify-between">
        <div class="cursor-pointer flex items-center space-x-2" @click="home">
            <img class="h-14 w-14" src="https://i.ibb.co/T1fnF5X/logo.png" alt="" srcset="">
            <span class="font-sm">TaskGen</span>
        </div>
        <div class="flex items-center">
            <input class="border rounded-md px-2" type="text" placeholder="procurar..." v-if="showSearch">
            <button @click="showSearch = !showSearch">

                <i v-if="!showSearch" class='bx bx-search bx-md' ></i>

                <i v-else class='bx bx-x bx-md' ></i>
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
  },
  methods: {
    home(){
        this.$router.push("/")
    }
  }
}
</script>

<style scoped>
</style>