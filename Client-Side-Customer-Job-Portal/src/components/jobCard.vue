<script>

import { useLoginStore } from '../stores/login'
import { useBookmarkStore } from '../stores/bookmark';
export default {
    name: "JobCard",
    props: ['card', 'isIcon'],
    computed: {
        userId() {
            const userId = useLoginStore().userId;
            // console.log('userId:', userId);
            return userId;
        }
    },
    methods: {
        async handleBookmark() {
            console.log('userId:', this.userId);
            console.log('jobId:', this.card.id);
            await useBookmarkStore().addBookmark({ userId: this.userId, jobId: this.card.id })
        },
        viewDetail() {
            this.$router.push(`/detail-job/${this.card.id}`)
        },
    },
}
</script>
<template>
    <section class="job">
        <div class="job-grid">
            <div class="card">
                <img :src="card.imgUrl" />
                <div class="card-body">
                    <h3 class="card-title">{{ card.title }}</h3>
                    <button class="card-btn" @click.prevent="viewDetail">View Detail</button>
                </div>
                <button class="card-icon-btn" v-if="isIcon" @click.prevent="handleBookmark">
                    <i class="material-icons" style="color:#F6CE01;">bookmark</i>
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Center items horizontally */
    justify-content: center;

    /* Center items vertically */
}


.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #FFFFFF;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 1px 4px rgba(248, 24, 24, 0.1);
    transition: all 0.3s ease-in-out;
    position: relative;
    margin-top: 12px;

}


.card-icon-btn {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.card-icon-btn i {
    font-size: 39px;
}

.card:hover {
    transform: translateY(-5px);
}

.card img {
    max-width: 50%;
    margin-bottom: 1rem;
}

.card h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
}

.card p {
    font-size: 1rem;
    font-weight: 500;
    color: #555;
    margin-bottom: 1rem;
}

.card-btn {
    background-color: #0D3880;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
}
</style>
