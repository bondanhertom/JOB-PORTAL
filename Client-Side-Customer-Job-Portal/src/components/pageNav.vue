<template>
    <nav aria-label="Page navigation example">

        <ul class="pagination">
            <li class="page-item mx-2" style="cursor: pointer" v-if="page > 0">
                <a @click="backPageNavHandler" class="page-link">Previous</a>
            </li>
            <li style="cursor: pointer" class="page-item mx-2" v-if="jobCount >= 0">
                <a @click="nextPageNavHandler" class="page-link">Next</a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    emits: ["nextPageNav", "backPageNav"],
    props: ["jobCount", "page"],
    methods: {
        nextPageNavHandler() {
            this.$emit("nextPageNav");
        },
        backPageNavHandler() {
            this.$emit("backPageNav");
        },
    },
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}

.pagination .page-item {
    margin: 0 0.5rem;
}

.pagination .page-item.disabled .page-link {
    color: #ced4da;
    background-color: #fff;
    border-color: #ced4da;
    cursor: default;
}

.pagination .page-item.disabled .page-link:hover {
    background-color: #fff;
}

.pagination .page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.pagination .page-item .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
}

.pagination .page-item .page-link:hover {
    z-index: 2;
    color: #0056b3;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
}
</style>
  