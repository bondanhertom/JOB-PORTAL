<script>
import { mapActions, mapState } from 'pinia'
import { useJobStore } from '../stores/job'

export default {
    name: 'Detail-Job',
    data() {
        return {
            current_url: window.location.href // tambahkan ini
        }
    },
    computed: {
        ...mapState(useJobStore, ['jobDetail'])
    },
    methods: {
        ...mapActions(useJobStore, ['fetchDetail']),
    },
    created() {
        this.fetchDetail({ id: this.$route.params.id, current_url: this.current_url })
    }
}
</script>

<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6">
                <img :src="jobDetail.imgUrl" class="img-fluid rounded" alt="Job Image">
            </div>
            <div class="col-md-6 mt-4 mt-md-0">
                <p class="mb-4">{{ jobDetail.title }}</p>
                <p class="mb-4">{{ jobDetail.Company.name }}</p>
                <p class="mb-4">{{ jobDetail.Company.location }}</p>
                <p class="mb-4">{{ jobDetail.jobType }}</p>
                <p class="mb-4">Posted On {{ new Date(jobDetail.createdAt).toLocaleDateString('en-GB', {
                    day:
                        'numeric', month: 'short', year: 'numeric'
                }).replace(/ /g, '-') }}</p>






                <hr>
                <h2 class="mb-4"><strong>Job Description:</strong></h2>
                <p class="mb-4">{{ jobDetail.description }}</p>
                <hr>
                <h2 class="mb-4"><strong>About Company:</strong></h2>
                <div class="company-details mb-4">
                    <p>Name: {{ jobDetail.Company.name }}</p>
                    <p>Location: {{ jobDetail.Company.location }}</p>
                    <p>Email: {{ jobDetail.Company.email }}</p>
                    <p>Description: {{ jobDetail.Company.description }}</p>
                </div>
                <hr>
                <div class="text-center">
                    <h3 class="mb-4"><strong> Scan this QR Code to view the Job Detail</strong></h3>
                    <div v-html="jobDetail.qr" style="width: 200px;" class="mx-auto"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
body {
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
    margin-top: 80px;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

img {
    max-height: 170px;
    object-fit: contain;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
}

.mb-4 {
    font-size: 1.4rem;
    line-height: 1.8rem;
}

hr {
    margin-top: 3rem;
    margin-bottom: 3rem;
    border: none;
    border-top: 2px solid #ddd;
}

h3 {
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.company-details p {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 1rem;
}

/* div[data-v-xxxxxxx] {

} */

@media (max-width: 576px) {
    img {
        max-height: 300px;
    }
}

.mb-4 {
    font-size: 1.4rem;
    line-height: 1.8rem;
    text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
  