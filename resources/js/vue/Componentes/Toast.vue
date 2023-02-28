<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="" class="rounded me-2" alt="">
                <strong class="me-auto" v-text="title"></strong>
                <small v-text="timestamp"></small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body" v-html="body">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'timestamp', 'body'],
    methods: {
        show() {
            const toastLive = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLive)
            toast.show()
        }
    }
}
</script>
