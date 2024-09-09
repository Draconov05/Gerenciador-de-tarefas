
<template>
    <div class="border rounded-md h-[12vh] w-[20vw] px-2 flex flex-col justify-between" @mouseover="show_menu = true" @mouseleave="show_menu = false" >
        <div class="h-1/3 flex items-center justify-between">
            <div>
                {{ localTask.titulo }}
            </div>
            <div class="flex space-x-2 relative">
                <BadgeStatus v-if="!show_menu && !isDashboard" :value="localTask.status" :tipo="localTask.status"></BadgeStatus>
                <div v-else-if="show_menu" class="flex space-x-2">
                    <div class="cursor-pointer" @click="OpenModalEdit">
                        <i class='bx bx-pencil bx-xs text-gray-400' ></i>                    
                    </div>
                    <div class="cursor-pointer" @click="ShowNews">
                        <i class='bx bx-news bx-xs text-blue-400' ></i>
                    </div>
                    <div class="cursor-pointer" @click="OpenDelete">
                        <i class='bx bx-trash bx-xs text-red-400' ></i>                    
                    </div>
                </div>
                
            </div>
        </div>
        <div class="h-1/3 space-x-2 overflow-x-auto w-full flex items-center">
            <span>Tags:</span>
            <BadgeStatus v-for="(keyWord, index) in palavrasChave" :key="index" :value="keyWord" tipo="key"></BadgeStatus>
        </div>
        <div class="h-1/3 space-x-2 overflow-x-auto w-full text-xs flex items-end py-2">
            <div class="space-x-2">
                <span>Data de criação:</span>
                <span class="text-gray-300">{{ dataCriacaoFormat }}</span>
            </div>
            <div class="space-x-2"> 
                <span>Última modificação:</span>
                <span class="text-gray-300">{{ dataAtualizacaoFormat }}</span>
            </div>
            
        </div>
        
    </div>
</template>  

<script >

import BadgeStatus from './BadgeStatus.vue'; 

export default {
    components: {BadgeStatus},
    props: ["task","isDashboard"],
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
    computed: {
        dataCriacaoFormat(){
            return this.$moment(this.localTask.dataCriacao).locale('pt-br').format('L')
        },
        dataAtualizacaoFormat(){
            return this.$moment(this.localTask.dataAtualizacao).locale('pt-br').format('L')
        },
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