<script>
export default {
    props: ['companies'],
}

</script>

<template>
    <div class="row">
        <div class="table-responsive">
            <table class="table align-middle ">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Company Name</th>
                        <th scope="col" width="180px">Logo</th>
                        <th scope="col">Location</th>
                        <th scope="col" style="text-align: center;">Email</th>
                        <th scope="col" width="250px">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(company, index) in companies" :key="company.id">
                        <td scope="row">#{{ index + 1 }}</td>
                        <td>{{ company.name }}</td>
                        <td><img :src="company.companyLogo" alt="company-logo" style="max-width:160px;"></td>
                        <td>{{ company.location }}</td>
                        <td>{{ company.email }}</td>
                        <td>{{ company.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped></style>