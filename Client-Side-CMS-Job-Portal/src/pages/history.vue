<script>
import Table from "../components/tableHistory.vue"

export default {
    props: ['histories'],
    components: {
        Table
    }
}
</script>
<template>
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-20 mx-auto" id="history-section">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="display-2">Histories</h1>
        </div>
        <Table :histories="histories" />
    </section>
</template>
<style scoped>
.display-2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}
</style>