<script>

export default {
    props: ['name'],
    emits: ["changePage"],
    methods: {
        changePage(page) {
            this.$emit("changePage", page);
        },
    }
}

</script>
<template>
    <div id="button">
        <button class="btn btn-primary rounded-pill" id="new" @click="changePage(page)">
            <i>{{ name }}</i>
        </button>
    </div>
</template>
<style scoped>
button {
    background-color: #fa9776;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    margin-top: 20px;
    width: 100%;
}

button:hover {
    background-color: #f6baa6;
    opacity: 1.0;
}
</style>