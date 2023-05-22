<script>

export default {
    emits: ['addCompany','changePage'],
    data() {
        return {
            inputCompany: {
                name: "",
                companyLogo: "",
                location: "",
                email: "",
                description: "",
            }
        }
    },
    methods: {
        addCompany() {
            this.$emit("addCompany", this.inputCompany);
        },
        changePage(page) {
            this.$emit("changePage", page);
        },

    }
}
</script>


<template>
    <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mx-auto" @submit.prevent="addCompany" id="new-company-section">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="display-2">New Company</h1>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <form id="category-form">
                    <div class="mb-3">
                        <label for="company-name">Name <span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="company-name" placeholder="Enter company name"
                            autocomplete="off" v-model="inputCompany.name" />
                    </div>
                    <div class="mb-3">
                        <label for="company-logo">Logo <span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="company-logo" placeholder="Enter company logo"
                            autocomplete="off" v-model="inputCompany.companyLogo" />
                    </div>
                    <div class="mb-3">
                        <label for="company-location">Location <span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="company-location" placeholder="Enter company location"
                            autocomplete="off" v-model="inputCompany.location" />
                    </div>
                    <div class="mb-3">
                        <label for="company-email">Email <span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="company-email" placeholder="Enter company email"
                            autocomplete="off" v-model="inputCompany.email" />
                    </div>

                    <div class="mb-3">
                        <label for="company-desc">Description <span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="company-desc" placeholder="Enter job company"
                            autocomplete="off" v-model="inputCompany.description" />
                    </div>

                    <div class="row mt-5 mb-3">
                        <div class="col-6">
                            <a class="btn btn-lg btn-light rounded-pill w-100 p-2" @click="changePage('company-section')" href="#">Cancel</a>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-lg btn-primary rounded-pill w-100 p-2" type="submit"
                                href="">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
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