<script>
import Form from "../components/jobForm.vue"
export default {
    props: ['job', 'companies', "page"],
    emits: ['updateJob', 'fetchCompany', 'changePage'],
    components: {
        Form
    },
    methods: {
        updateJob(value) {
            this.$emit("updateJob", value);
        },
        fetchCompany() {
            this.$emit('fetchCompany')
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
    }
}
</script>
<template>
    <div id="job-update">
        <Form :page="page" :job="job" :companies="companies" @updateJob="updateJob($event)" @fetchCompany="fetchCompany"
            @changePage="changePage($event)" />
    </div>
</template>

<style></style> 