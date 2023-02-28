<template>
    <div class="container">
        <div class="row justify-content-md-center m-5">
            <div class="col-8">
                <div class="card shadow">
                    <div class="card-body p-5">
                        <h3 class="card-title  text-center mb-2">{{ title }}</h3>
                        <p class="text mb-4 text-center">Por favor rellene el siguiente formulario para agregar un nuevo usuario.</p>
                        <p v-if="errors.length">
                            <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </p>


                        <form ref="formRef" class="row g-3" @submit.prevent="checkForm" enctype="multipart/form-data">
                            <div class="col-12 mb-3">
                                <label for="first_name" class="form-label">Nombre</label>
                                <input type="text" class="form-control" name="first_name" v-model="user.first_name"
                                       id="first_name"
                                       placeholder="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="last_name" class="form-label">Apellido</label>
                                <input type="text" class="form-control" name="last_name" v-model="user.last_name"
                                       id="last_name"
                                       placeholder="">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="email" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" name="email" v-model="user.email" id="email"
                                       placeholder="name@example.com">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="birthdate" class="form-label">Fecha de Nacimiento</label>
                                <input type="date" class="form-control" name="email" v-model="user.birthdate" id="birthdate">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="photo_profile" class="form-label">Foto de Perfil</label>
                                <input type="file" class="form-control" name="photo_profile"
                                       @change="upload_avatar" id="photo_profile">
                            </div>
                            <div class="col-12 mb-3">
                                <div class="avatar img-fluid img-circle" style="margin-top:10px">
                                    <img :src="get_avatar()" width="100"/>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary mb-3" v-if="operation==='create'">Guardar</button>
                                <button type="submit" class="btn btn-primary mb-3" v-else>Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <Toast ref="toastRef" :title="alert.title" :body="alert.body" :timestamp="alert.timestramp"></Toast>
    </div>


</template>
<script>
import {defineComponent, ref} from 'vue'
import axios from "axios";

export default defineComponent({
    data() {
        return {
            // datos del usuario
            title: 'Agregar Usuario',
            user: {
                first_name: "",
                last_name: "",
                email: "",
                photo_profile: "",
                birthdate: "",
            },
            // base de la url
            path: location.origin,
            // tamaño maximo permitido de la imagen
            maxSizeImage: 2111775,
            // errores del formulario
            errors: [],
            // alerta
            alert: {
                timestamp: "",
                body: "",
                title: "",
            },
            operation: "create",
        }
    },
    setup(){
        const toastRef = ref();
        const formRef = ref();
        return {
            toastRef,formRef
        }
    },
    methods:{
        // Chequea si los campos del formulario son válidos
        checkForm:  function (e)  {
            this.errors = [];
            let min = 3, max = 249;


            if (!this.user.first_name) {
                this.errors.push("El nombre es obligatorio.");
            }else{
                if(!this.validLong(this.user.first_name, min)){
                    this.errors.push("El nombre debe tener minimo " + min + " carácteres")
                }
                if(this.validLong(this.user.first_name, max)){
                    this.errors.push("El nombre debe no tener mas de " + max + " carácteres")
                }
            }
            if (!this.user.last_name) {
                this.errors.push("El apellido es obligatorio.");
            }else{
                if(!this.validLong(this.user.last_name, min)){
                    this.errors.push("El apellido debe tener minimo " + min + " carácteres")
                }
                if(this.validLong(this.user.last_name, max)){
                    this.errors.push("El apellido debe no tener mas de " + max + " carácteres")
                }
            }
            if (!this.user.birthdate) {
                this.errors.push("La fecha de Nacimiento es obligatorio.");
            }
            if (!this.user.photo_profile) {
                this.errors.push("Es obligatorio cargar una imagen menor a " + (Math. trunc(this.maxSizeImage / 1000000))  +" MB");
            }
            if (!this.user.email) {
                this.errors.push('El correo electrónico es obligatorio.');
            } else if (!this.validEmail(this.user.email)) {
                this.errors.push('El correo electrónico debe ser válido.');
            }

            if (!this.errors.length) {
                if(this.operation === "create"){
                    this.save();
                }else{
                    this.update();
                }
                return true;
            }

            e.preventDefault();
        },
        // Validación del email
        validEmail:  (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        // Validacion de longitud del campo
        validLong: (input, min = 3) => {
            return input.length > min;
        },

        // Operación post para guardar cambios
        async save(){
            await axios.post(`${this.path}/user/create`, this.user).then(response => {
                let data = response.data;
                //console.log(data)
                if(data.result === true){
                    this.alert.body = `El usuario ha sido agregado con éxito`;
                    this.alert.timestamp = "hace 1 seg";
                    this.alert.title = "Operación éxitosa"
                    this.toastRef.show();
                    this.resetForm()
                    return
                }
                this.alert.body = "Este correo ya esta registrado";
                this.alert.timestamp = "hace 1 seg";
                this.alert.title = "La operación ha fallado"
                this.toastRef.show();
            })
        },
        // Operación post para guardar cambios
        async update(){
            await axios.post(`${this.path}/user/update`, this.user).then(response => {
                let data = response.data;
                //console.log(data)
                if(data.result === true){
                    this.alert.body = `El usuario ha sido actualizado con éxito`;
                    this.alert.timestamp = "hace 1 seg";
                    this.alert.title = "Operación éxitosa"
                    this.toastRef.show();
                    this.resetForm();
                    localStorage.removeItem("user");
                    this.$router.push('query_user');
                    return
                }
                this.alert.body = "El usuario no se ha podido actualizar correctamente";
                this.alert.timestamp = "hace 1 seg";
                this.alert.title = "La operación ha fallado"
                this.toastRef.show();
            })
        },
        // Resetear el formulario
        resetForm(){
            this.formRef.reset()
            this.user = {
                first_name: "",
                last_name: "",
                email: "",
                photo_profile: "",
            }
        },
        // Verificar el tamaño del archivo, si es menor a 2MB lo convierte a base 64 y lo guarda en user.photo_profile
        upload_avatar(e) {
            let file = e.target.files[0];
            let reader = new FileReader();

            if (file['size'] < this.maxSizeImage) {
                reader.onloadend = (file) => {
                    //console.log('RESULT', reader.result)
                    this.user.photo_profile = reader.result;
                }
                reader.readAsDataURL(file);

            } else {
                alert('Esta imagen supera los 2 MB')
                //this.errors.push("Esta imagen supera los 2 MB");
            }
        },
        // Carga la imagen base 64
        get_avatar() {
            if(this.user.photo_profile === ""){
                return "";
            }
            let photo = (this.user.photo_profile.length > 100) ? this.user.photo_profile : "img/profile/" + this.user.photo_profile;
            return photo;
        },
    }
});

</script>
