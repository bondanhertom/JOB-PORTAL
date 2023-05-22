<script>
export default {
    props: ['histories'],
    methods: {
        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit',second: '2-digit', hour12: true };
            const formattedDate = new Date(date).toLocaleDateString('id-ID', options).replace(/\//g, '/').replace(',', '');
            return formattedDate;
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="table-responsive">
            <table class="table align-middle ">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Job Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Created At</th>
                        <th scope="col" width="50px"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(history, index) in histories" :key="history.id">
                        <td scope="row">#{{ index + 1 }}</td>
                        <td>{{ history.name }}</td>
                        <td>{{ history.description }}</td>
                        <td>{{ history.updatedBy }}</td>
                        <td>{{ formatDate(history.createdAt) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>

</style>