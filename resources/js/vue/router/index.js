import {createRouter, createWebHistory} from 'vue-router';

const AddComponent = () => import ('../web/FormUser.vue');
const UpdateComponent = () => import ('../web/UpdateUser.vue');
const ContactoComponent = () => import ('../web/QueryUser.vue');
const routes = [
    {path: '/', name: 'home', component: AddComponent},
    {path: '/update_user', name: 'update_user', component: UpdateComponent},
    {path: '/query_user', name: 'query_user', component: ContactoComponent}
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
export default router;
