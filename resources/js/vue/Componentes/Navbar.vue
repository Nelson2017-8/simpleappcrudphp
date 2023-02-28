<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-primary shadow">
            <div class="container-fluid">
                <a class="navbar-brand text-white" href="#">Simple Aplicación CRUD</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="justify-content-md-center collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="item in items" :key="item.nombre">
                            <router-link class="nav-link text-white" aria-current="page" :to="item.ruta">{{ item.nombre }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {nombre: 'Agregar', icon: 'Foo', ruta: '/'},
                    {nombre: 'Mostrar', icon: 'Bar', ruta: '/query_user'}
                ],
                drawer: null,
            }
        },
    }
</script>
