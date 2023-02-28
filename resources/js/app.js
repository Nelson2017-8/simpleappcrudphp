import './bootstrap';
import {createApp} from 'vue/dist/vue.esm-bundler';
import App from './vue/web/App.vue';
import RouterWeb from './vue/router/index'
import NavbarComponent from "@/vue/Componentes/Navbar.vue";
import ToastComponent from "@/vue/Componentes/Toast.vue";
import ModalComponent from "@/vue/Componentes/Modal.vue";
import AddUserComponent from "@/vue/web/FormUser.vue";

const app = createApp(App);
app.use(RouterWeb);
app.component('Navbar', NavbarComponent);
app.component('Toast', ToastComponent);
app.component('Modal', ModalComponent);
app.component('Add', AddUserComponent);
app.mount('#app');
