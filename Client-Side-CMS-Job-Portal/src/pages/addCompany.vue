<script>
import Form from "../components/companiesForm.vue"
export default {
    emits: ['addCompany','changePage'],
    components: {
        Form
    },
    methods: {
        addCompany(value) {
            this.$emit("addCompany", value)
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
        
    }
}
</script>
<template>
    <div id="company-add">
        <Form @addCompany="addCompany($event)"  @changePage="changePage($event)"/>

    </div>
</template>

<style></style>