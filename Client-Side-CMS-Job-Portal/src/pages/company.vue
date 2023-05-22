<script>
import Button from "../components/button.vue"
import Table from "../components/tableCompany.vue"
export default {
    props: ['companies'],
    emits: ['changePage'],
    components: {
        Button,
        Table

    },

    data() {
        return {
            name: "Add Company",
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.$emit("changePage", page);
        },
    }
}
</script>


<template>
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-20 mx-auto" id="company-section">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="display-2">Company</h1>
            <Button @changePage="changePage('company-add')" :name="name" />
        </div>
        <Table :companies="companies" />
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