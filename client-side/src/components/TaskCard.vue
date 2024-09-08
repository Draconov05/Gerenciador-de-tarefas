
<template>
    <div class="border rounded-md h-[15vh] w-[20vw] px-2" @mouseover="show_menu = true" @mouseleave="show_menu = false" >
        <div class="h-1/3 flex items-center justify-between">
            <div>
                {{ localTask.titulo }}
            </div>
            <div class="flex space-x-2 relative">
                <BadgeStatus v-if="!show_menu" :value="localTask.status" :tipo="localTask.status"></BadgeStatus>
                <div v-else class="flex space-x-2">
                    <div class="cursor-pointer" @click="OpenModalEdit" v-tooltip="'Editar'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z"></path></svg>
                    </div>
                    <div class="cursor-pointer" @click="OpenDelete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="h-1/3 space-x-2">
            <span>Tags:</span>
            <BadgeStatus v-for="(keyWord, index) in palavrasChave" :key="index" :value="keyWord" tipo="key"></BadgeStatus>
        </div>
        
    </div>
</template>  

<script >

import BadgeStatus from './BadgeStatus.vue'; 

export default {
    components: {BadgeStatus},
    props: ["task"],
    emits: ["modal_edit"],
    data() {
        return {
            palavrasChave: [],
            show_menu: false,
            localTask: this.task
        }
    },
    watch: {
        task(value){
            this.localTask = value;
            this.palavrasChave = value.palavrasChaves.split(",")
        }
    },
    mounted(){
        this.palavrasChave = this.task.palavrasChaves.split(",")
    },
    methods:{
        OpenModalEdit(){
            this.$emit("modal_edit",this.task)
        },
        OpenDelete(){
            this.$emit("delete_confirm",this.task._id)
        }
    }
}
</script>

<style scoped>
</style>