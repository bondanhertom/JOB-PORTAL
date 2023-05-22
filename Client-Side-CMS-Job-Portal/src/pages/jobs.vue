<script>
import Table from "../components/tableJob.vue"
import Button from "../components/button.vue"
export default {
    props: ['jobs', 'companies'],

    emits: ['changePage', "updateJobStatus", "editJob"],
    components: {
        Table,
        Button
    },
    methods: {
        changePage(page) {
            this.$emit("changePage", page);
        },
        updateJobStatus(job) {
            this.$emit('updateJobStatus', job)
        },
        editJob(jobId) {
            this.$emit('editJob', jobId)
        }

    }
}
</script>
<template>
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-20 mx-auto" id="job-section">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="display-2">Jobs</h1>
        <Button @changePage="changePage('job-add')" :name="'Add Job'" />
    </div>
    <Table :jobs="jobs" :companies="companies" @updateJobStatus="updateJobStatus($event)" @editJob="editJob($event)" />
</section>
    
</template>


<style scoped>
.display-2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    
}
</style> 