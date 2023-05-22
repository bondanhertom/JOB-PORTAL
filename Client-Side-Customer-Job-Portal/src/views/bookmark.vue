<script>

import { mapState, mapActions } from 'pinia'
import { useBookmarkStore } from '../stores/bookmark'
import { useLoginStore } from '../stores/login'
import JobCard from "../components/jobCard.vue"

export default {
    name: 'Bookmark',
    components: {
        JobCard,
    },
    computed: {
        ...mapState(useBookmarkStore, ['bookmarks']),
        userId() {
            const userId = useLoginStore().userId;
            console.log('userId:', userId);
            return userId;
        }
    },
    methods: {
        ...mapActions(useBookmarkStore, ['addBookmark', 'fetchBookmark']),

        viewDetail(bookmark) {
            this.$router.push(`/detail-job/${bookmark.Job.id}`)
        },
    },
    created() {
        this.fetchBookmark(this.userId);
    }
};
</script>


<template>
    <section class="bookmark">
        <div class="col-12 mt-3 mb-5">
            <h1 class="text-center">LIST BOOKMARK</h1>
        </div>
        <div v-if="bookmarks.length > 0" class="bookmark-grid">
            <div class="card w-100 h-100" v-for="bookmark in bookmarks" :key="bookmark.id">
                <div class="card-body">
                    <img :src="bookmark.Job.imgUrl" class="card-img" />
                    <h3 class="card-title">{{ bookmark.Job.title }}</h3>
                    <div class="card-buttons">
                        <button class="card-btn" @click.prevent="viewDetail(bookmark)">
                            <i class="material-icons">visibility</i> View Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="col-12 mt-3 mb-5">
            <h1 class="text-else">YOU HAVEN'T ADDED ANY BOOKMARK YET!</h1>
        </div>
    </section>
</template>



<style scoped>
/* Products section */

.text-else {
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin-top: 4rem;
    text-align: center;
}

.bookmark h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
}

.bookmark-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 3rem;
    margin-left: 2rem;
    margin-right: 2rem;
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
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0px 1px 4px rgba(248, 24, 24, 0.1);
    transition: all 0.3s ease-in-out;
    position: relative;
}

.card-icon-btn {
    cursor: pointer;
}

.card-icon-btn i {
    font-size: 39px;
}

.card:hover {
    transform: translateY(-5px);
}

.card img {
    max-height: 120px;
    object-fit: contain;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 2px rgba(242, 10, 33, 0.1);
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
