<template>

    <div class="w-[100vw] h-[100vh]">
        <HeaderBar goBack="listagem" :noSearch="true" />
        <!-- listgrid -->
        <div class="p-5">
            <div class="flex justify-between">
                <span>Últimas notícias sobre {{ task.titulo }}</span>
                <button class="text-sm rounded-lg px-2 py-1"
                    :class="[task.status == 'Concluído' ? 'text-gray-400 bg-gray-100' : 'text-blue-400 bg-blue-100']"
                    :disabled="task.status == 'Concluído'" @click="SearchNews(task._id)">Procurar Mais</button>
            </div>
            <div>
                <div class="grid grid-cols-4 py-2">
                    <li v-for="(new_inner, index) in localNews" :key="index" class="my-1 px-2">
                        <a :href="new_inner.link" class="underline text-blue-400">{{
                            new_inner.link.split("/").at(-1).split(".html").at(0) }}</a>
                    </li>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import HeaderBar from "../../components/HeaderBar.vue";

import axios from "axios";


export default {
    name: "TaskNews",
    components: {
        HeaderBar
    },
    data() {
        return {
            localNews: [],
            task: {
                _id: "",
                titulo: "",
                status: "",
                tags: []
            }
        }
    },
    computed: {
    },
    mounted() {
        let _id = this.$route.query.task

        if (!_id) {
            this.$router.push("/")
        }

        this.getTask(_id)
    },
    methods: {
        async SearchNews(_id) {
            this.task._id = _id
            axios.get("http://localhost:3000/assuntos/noticias/" + _id).then(res => {
                this.task.tags = res.data.palavrasChaves.split(",")
                this.localNews = res.data.link.reverse();
            }).catch(err => console.log(err))
        },
        async getTask(_id) {
            this.task._id = _id
            axios.get("http://localhost:3000/assuntos/" + _id).then(res => {
                this.task.titulo = res.data.titulo
                this.task.status = res.data.status
                this.task.tags = res.data.palavrasChaves.split(",")
                this.localNews = res.data.link.reverse();
            }).catch(err => console.log(err))
        },
        TreatUrlName(name) {
            console.log(name)
            if (name.link) {
                // let treatedName = name.link.split("/")[-1];
                // treatedName = treatedName.split(".html")[0];
                // console.log("treatedName - ",treatedName);
                // return treatedName;
            }
            return ""

        }
    }
}
</script>

<style scoped></style>