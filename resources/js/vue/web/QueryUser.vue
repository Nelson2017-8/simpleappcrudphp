<template>
    <div class="container">
        <div class="row justify-content-md-center my-5">
            <div class="col-12">
                <h1 class="text-info text-center mb-5">Buscar usuario</h1>
                <div class="input-group mb-3">
                    <input type="search" class="form-control" v-model="email"
                           placeholder="Introduzca el correo del usuario"
                           aria-label="Introduzca el correo del usuario" aria-describedby="search-button"
                    >
                    <button class="btn btn-primary" type="button" id="search-button" @click="search">Buscar</button>
                </div>
            </div>
            <div class="col-12" v-if="emptyData === true">
                <div class="alert alert-danger" role="alert">
                    No hay usuarios registrado en el sistema
                </div>
            </div>
        </div>

        <div class="row justify-content-md-center mb-5" v-if="emptyData === false">
            <div class="col-12" v-if="listUsers !== null">
                <table class="table table-bordered table-borderless table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Foto</th>
                        <th>Nombre Completo</th>
                        <th>Correo Electrónico</th>
                        <th>Fecha de Nacimiento</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(user, index) in listUsers" :key="user.id">
                        <td>{{ ++index }}</td>
                        <td>
                            <img :src="user.photo_profile" :alt="user.email" width="50">
                        </td>
                        <td>
                            {{ user.first_name }} {{ user.last_name }}
                        </td>
                        <td>
                            {{ user.email }}
                        </td>
                        <td>
                            {{ formatDate(user.birthdate) }}
                        </td>
                        <th>
                            <div class="btn-group btn-group-sm">
                                <button type="button" @click="updateUser(user)" class="btn btn-secondary">Actualizar</button>
                                <button type="button" @click="deleteUser(user.id, user.email)" class="btn btn-danger">Eliminar</button>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <Toast ref="toastRef" :title="alert.title" :body="alert.body" :timestamp="alert.timestramp"></Toast>
        <Modal ref="modalRef" :title="modal.title" :body="modal.body" @modalSave="confirmDeleteUser"></Modal>
    </div>


</template>
<script>
import {defineComponent, ref} from 'vue'
import axios from "axios";

export default defineComponent({
    data() {
        return {
            listUsers: null,
            path: location.origin,
            email: "",
            // alerta
            alert: {
                timestamp: "",
                body: "",
                title: "",
            },
            id: null,
            modal: {
                title:'', body:''
            },
            emptyData: true,
            // user: null,
        }
    },
    setup() {
        const toastRef = ref();
        const modalRef = ref();
        return {
            toastRef, modalRef
        }
    },
    methods: {
        async search() {
            this.listUsers = null;
            if(this.email==="" || this.email.length < 3){
                this.loadData();
                return;
            }

            axios.post(`${this.path}/user/find`, {email: this.email}).then(response => {
                const data = response.data;
                if (data.listUsers === null) {
                    this.alert.body = "No hay registros asociado al correo " + this.email;
                    this.alert.timestamp = "hace 1 seg";
                    this.alert.title = "Lo siento mucho"
                    this.toastRef.show();
                    this.emptyData = true;
                }else {
                    this.listUsers = [data.user];
                    if (this.listUsers.length === 0 ){
                        this.emptyData = true;
                    }
                }

            });
        },
        formatDate(d){
            let date = new Date(d);
            let anio = date.getFullYear()
            let day = date.getDate() + 1
            if(day < 10){
                day = "0" + day;
            }
            let month = date.getMonth()+1
            if(month < 10){
                month = "0" + month;
            }
            return `${day}/${month}/${anio}`;
        },
        async loadData() {
            this.emptyData = false;
            await axios.post(`${this.path}/user/query`).then(response => {
                const data = response.data;
                if (data.resul === false) {
                    this.alert.body = "No hay usuarios registrados en la base de Datos";
                    this.alert.timestamp = "hace 1 seg";
                    this.alert.title = "Lo siento mucho"
                    this.toastRef.show();
                    return;
                }
                if (data.users !== undefined) {
                    this.users = data.users;
                    this.listUsers = data.users;
                    if (this.users.length === 0 ){
                        this.emptyData = true;
                    }
                    return;
                }
                this.emptyData = true;
            });
        },
        async confirmDeleteUser(){
            axios.post(`${this.path}/user/delete`, {id:this.id}).then(response => {

                const data = response.data;
                if (data.result === true) {
                    this.alert.body = "Usuario eliminado";
                    this.alert.timestamp = "hace 1 seg";
                    this.alert.title = "Operación exitosa"
                    this.toastRef.show();
                    this.id = null;
                    this.loadData();
                    return;
                }

                this.alert.body = "El Usuario no se pudo eliminar";
                this.alert.timestamp = "hace 1 seg";
                this.alert.title = "Ha ocurrido un error inesperado"
                this.toastRef.show();
                this.id = null;
            })
        },
        deleteUser(id, email){
            this.modal.title = "Eliminar usuario";
            this.modal.body = `¿Esta seguro que desea eliminar el usuario <strong>${email}</strong>?`;
            this.modalRef.show()
            this.id = id;
        },
        updateUser(user){
            localStorage.setItem("user", JSON.stringify(user));
            this.$router.push('update_user');
        },
    },
    mounted() {
        this.loadData();
    }

});

</script>
