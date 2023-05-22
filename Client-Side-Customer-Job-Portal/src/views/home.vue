
<script>
import JobCard from "../components/jobCard.vue"
import { mapActions, mapState } from 'pinia'
import { useJobStore } from '../stores/job'
import PageNav from "../components/pageNav.vue"
export default {
    name: "HomePage",
    components: {
        JobCard,
        PageNav

    },

    data() {
        return {
            page: 0,
        };
    },


    computed: {
        ...mapState(useJobStore, ['cards']),
        isAuthenticated() {
            return !!localStorage.getItem('access_token')
        },
        getCardsCount() {
            if (this.cards.jobs) {
                return this.cards.jobs.length;
            }
        },
    },
    methods: {
        ...mapActions(useJobStore, ["nextPage", 'fetchCard']),

        nextPageHandler() {
            this.page++;
        },

        backPageHandler() {
            if (this.page > 0) {
                this.page--;
            }
        },

    },
    watch: {
        page(val) {
            this.nextPage(val);
        },
    },
    created() {
        this.fetchCard()
    }
}
</script>

<template>
    <main>
        <div class="container">
            <div class="jobs"> <!-- Kolom pertama (kiri) untuk jobs -->
                <JobCard v-for="card in cards.jobs" :key="card.id" :card="card" :isIcon="isAuthenticated" />
                <PageNav class="d-flex justify-content-center" @nextPageNav="nextPageHandler" @backPageNav="backPageHandler"
                    :page="page" :jobCount="getCardsCount" />
            </div>

            <div class="spacer">

                <img class="gift-img" src="../assets/git.gif" alt="gif" />
                <div>
                    <h1 class="gift-text">Tersedia 1.000 lowongan pekerjaan untukmu</h1>
                    <h2>Pilih lowongan untuk melihat lebih detil</h2>
                </div>


            </div> <!-- Kolom kedua kosong -->
        </div>

    </main>
</template>
<style scoped>
h2 {
    color: #888;
    font-weight: normal;
}

.container {
    display: grid;
    grid-template-columns: 30% 70%;
    margin-top: 56px
    
}

.jobs {
    grid-column: 1;
    background-color:#F7F8FB;
    padding: 15px;
    gap: 100px;
    
}

.spacer {
    grid-column: 2;
    padding: 20px;
    position: fixed;
    /* membuat posisi tetap di tengah saat scroll */
    left: 65%;
    /* mengatur posisi horizontal */
    bottom: 20px;
    /* mengatur posisi vertikal */
    transform: translate(-50%, 0);
    /* memindahkan posisi horizontal ke kiri sebesar 50% lebar elemen */
    text-align: center;
    /* mengatur teks agar ditengah */
}

.gift-img {
    width: 410px;
    /* atur ukuran gambar */
    height: auto;
    /* atur ukuran gambar */
}

.gift-text {
    font-size: 19px;
    font-weight: bold;
    margin-top: 5px;
}
</style>