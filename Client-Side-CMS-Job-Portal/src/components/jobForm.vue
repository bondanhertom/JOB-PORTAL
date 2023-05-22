<script>
export default {
    props: ["companies", "page", "job"],
    emits: ['addJob', 'updateJob', 'fetchCompany', 'changePage'],
    data() {
        return {
            inputAddJob: {
                id: "",
                title: "",
                description: "",
                imgUrl: "",
                companyId: "",
                jobType: "",
                status: ""
            }
        }
    },

    methods: {
        submitForm() {
            if (this.page === 'job-add') {
                this.$emit("addJob", this.inputAddJob);
            } else {
                this.$emit("updateJob", this.inputAddJob);
            }
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
    },
    created() {

        this.$emit('fetchCompany')

        if (this.page === 'job-update') {
            this.inputAddJob.id = this.job.id
            this.inputAddJob.title = this.job.title
            this.inputAddJob.description = this.job.description
            this.inputAddJob.imgUrl = this.job.imgUrl
            this.inputAddJob.companyId = this.job.companyId
            this.inputAddJob.jobType = this.job.jobType
        }
    }
}
</script>
<template>
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mx-auto" id="job-form" @submit.prevent="submitForm">
        <div v-if="page === 'job-add'"
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="display-2">New Jobs</h1>
        </div>
        <div v-if="page === 'job-update'"
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="display-2">Update Jobs</h1>
        </div>
        <div class="row">
            <form>
                <div class="mb-3">
                    <label for="job-name">Job Name <span class="text-danger fw-bold">*</span></label>
                    <input type="text" class="form-control" id="job-name" placeholder="Enter job name" autocomplete="off"
                        v-model="inputAddJob.title" />
                </div>

                <div class="mb-3">
                    <label for="job-type">Job Type <span class="text-danger fw-bold">*</span></label>
                    <input type="text" class="form-control" id="job-type" placeholder="Enter job type" autocomplete="off"
                        v-model="inputAddJob.jobType" />
                </div>

                <div class="mb-3">
                    <label for="job-image">Image <span class="text-danger fw-bold">*</span></label>
                    <input type="text" class="form-control" id="job-image" placeholder="Enter job image url"
                        autocomplete="off" v-model="inputAddJob.imgUrl" />
                </div>

                <div class="mb-3">
                    <label for="job-company">Company <span class="text-danger fw-bold">*</span></label>
                    <select id="job-company" name="companyId" class="form-select" v-model="inputAddJob.companyId">
                        <option value="" selected disabled>Choose Category</option>
                        <option v-for="(company, index) in companies" :key="index" :value="company.id">{{ company.name }}
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="job-desc">Description <span class="text-danger fw-bold">*</span></label>
                    <input type="text" class="form-control" id="job-desc" placeholder="Enter job description"
                        autocomplete="off" v-model="inputAddJob.description" />
                </div>

                <div class="row mt-5 mb-3">
                    <div class="col-6">
                        <a class="btn btn-lg btn-light rounded-pill w-100 p-2" @click="changePage('job-section')"
                            href="#">Cancel</a>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit" href="">Submit</button>
                    </div>
                </div>
            </form>
        </div>
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