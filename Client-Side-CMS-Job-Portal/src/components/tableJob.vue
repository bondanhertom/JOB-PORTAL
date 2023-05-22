<script>
export default {
    props: ['jobs', "companies"],
    emits: ["updateJobStatus", "editJob"],

    methods: {
        updateJobStatus(job) {
            this.$emit('updateJobStatus', job)
        },
        editJob(jobId) {
            this.$emit('editJob', jobId)
        }
    }
};
</script>
<template>
    <div class="row">
        <div class="table-responsive">
            <table class="table align-middle ">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Job Name</th>
                        <th scope="col" width="250px">Description</th>
                        <th scope="col" width="180px">Image</th>
                        <th scope="col">Type</th>
                        <th scope="col">Author</th>
                        <th scope="col" style="text-align: center;" >Status</th>
                        <th scope="col" width="50px"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(job, index) in jobs" :key="job.id">
                        <td scope="row">#{{ index + 1 }}</td>
                        <td>{{ job.title }}</td>
                        <td>{{ job.description }}</td>
                        <td><img :src="job.imgUrl" alt="Job image" style="max-width:160px;"></td>
                        <td>{{ job.jobType }}</td>
                        <td>{{ job.User.username }}</td>
                        <td>
                            <select class="form-select" aria-label="Default select example" name="status"
                                v-model="job.status" @change="updateJobStatus(job)">
                                <option value="Active" :selected="job.status === 'Active'">Active</option>
                                <option value="Inactive" :selected="job.status === 'Inactive'">Inactive</option>
                                <option value="Archived" :selected="job.status === 'Archived'">Archived</option>
                            </select>
                        </td>
                        <td>
                            <a href="#" class="ms-3" @click="editJob(job)"><span
                                    class="material-icons text-primary edit-icon">edit</span></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

</style>

