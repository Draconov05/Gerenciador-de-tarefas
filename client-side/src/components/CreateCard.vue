
<template>
    <div class="border rounded-md h-[15vh] w-[20vw] px-2 bg-gray-50 flex items-center justify-center">
        <div class="rounded-full h-10 w-10 bg-gray-100 flex items-center justify-center hover:scale-110 cursor-pointer" @click="$emit('modal_add')">
            <i class='bx bx-plus bx-sm text-gray-300'></i>        
        </div>        
    </div>
</template>  

<script >

export default {
    components: {},
    emits: ["modal_add"],
    data() {
        return {
        }
    },
}
</script>

<style scoped>
</style>