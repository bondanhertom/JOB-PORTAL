<script>
import Form from "../components/jobForm.vue"
export default {
    props: ['companies', "page"],
    emits: ["changePage","addJob"],
    components: {
        Form
    },
    methods: {
        addJob(value) {
            this.$emit("addJob", value);
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
    }
}
</script>
<template>
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mx-auto" id="job-add">
        <div>
            <Form :page="page" :companies="companies" @addJob="addJob($event)"
                @changePage="changePage($event)" />
        </div>
    </section>
</template>

<style scoped></style>