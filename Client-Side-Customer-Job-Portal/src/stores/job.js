import { defineStore } from 'pinia'
import Axios from 'axios'

export const useJobStore = defineStore('job', {
    // other options...
    state: () => ({ //data() dikomponenen
        cards: [],
        jobDetail: {},
    }),
    getters: {
        // getters lainnya
        filteredCards: state => filter => {
            return state.cards.filter(card => {
                return card.name.toLowerCase().includes(filter.toLowerCase())
            })
        }
    },
    actions: { //seperti method di komponene
        async fetchCard() {
            try {
                let { data } = await Axios.get(`https://jobbet-production.up.railway.app/pub/jobs`)
                this.cards = data

                

            } catch (error) {
                console.log(error.response);
            }
        },
        async fetchDetail(input) {
            try {
                console.log(input);
                let { data } = await Axios({
                    url: `https://jobbet-production.up.railway.app/pub/jobs/${input.id}`,
                    method: "get",
                    headers: input
                })
                this.jobDetail = data
            }
            catch (error) {
                console.log(error.response);

            }
        },
        async searchCards(filter) {
            try {
                const { data } = await Axios.get(`https://jobbet-production.up.railway.app/pub/jobs?filter=${filter}`)
                this.cards = data
                this.loading = false
            } catch (error) {
                console.log(error);
            }
        },

        async nextPage(page) {
            try {
                let { data } = await Axios({
                    url: `https://jobbet-production.up.railway.app/pub/jobs`,
                    method: "get",
                    params: { page },
                });

                this.cards = data;
            } catch (err) {
                console.log(err);
            }
        },

    },
})