<template>
    <Add ref="AddUserRef"></Add>
</template>

<script>
//import AddUser from "./AddUser";
import {defineComponent, ref} from 'vue'
import axios from "axios";

export default defineComponent({
    // components: [AddUser],
    setup() {
        const AddUserRef = ref();
        return {
            AddUserRef,
        }
    },
    data(){
        return{
            // base de la url
            path: location.origin,
            user: {},
        }
    },
    methods:{
        init(){
            let user = localStorage.getItem("user");
            if(user!==null){
                this.user = JSON.parse(user);
                this.AddUserRef.user = this.user;
                this.AddUserRef.operation = "update";
                this.AddUserRef.title = "Actualizar usuario"
            }
        }
    },
    mounted() {
        this.init();
    }
});
</script>

