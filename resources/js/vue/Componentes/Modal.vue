<template>
    <!-- Modal -->
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalLabel">{{ title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-html="body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="save">Aplicar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'body'],
        emits: ['modalSave'],
        methods: {
            save(){
                this.$emit("modalSave");
            },
            show(){
                const myModal = new bootstrap.Modal(document.getElementById('modal'), {});
                myModal.show();
            },
        }
    }
</script>
