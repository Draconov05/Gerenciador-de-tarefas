
<template>
    <div class="border rounded-md h-[15vh] w-[20vw] px-2 flex flex-col justify-between" @mouseover="show_menu = true" @mouseleave="show_menu = false" >
        <div class="h-1/3 flex items-center justify-between">
            <div>
                {{ localTask.titulo }}
            </div>
            <div class="flex space-x-2 relative">
                <BadgeStatus v-if="!show_menu" :value="localTask.status" :tipo="localTask.status"></BadgeStatus>
                <div v-else class="flex space-x-2">
                    <div class="cursor-pointer" @click="OpenModalEdit" v-tooltip="'Editar'">
                        <i class='bx bx-pencil bx-sm' ></i>                    
                    </div>
                    <div class="cursor-pointer" @click="ShowNews" v-tooltip="'Noticias'">
                        <i class='bx bx-news bx-sm' ></i>
                    </div>
                    <div class="cursor-pointer" @click="OpenDelete">
                        <i class='bx bx-trash bx-sm' ></i>                    
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
    emits: ["modal_edit","delete_confirm"],
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
        ShowNews(){
            this.$router.replace({ name: 'noticias', query: { task: this.task._id }})
        },
        OpenDelete(){
            this.$emit("delete_confirm",this.task)
        }
    }
}
</script>

<style scoped>
</style>