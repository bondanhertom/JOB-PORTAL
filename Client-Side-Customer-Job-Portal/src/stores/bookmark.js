import { defineStore } from 'pinia';
import Axios from 'axios';
import Swal from "sweetalert2";

export const useBookmarkStore = defineStore('favorite', {
    state: () => ({
        bookmarks: [],
    }),

    getters: {
    },

    actions: {
        async addBookmark({ userId, jobId }) {
            try {
                const response = await Axios.post(
                    'https://jobbet-production.up.railway.app/pub/bookmarks',
                    {
                        userId,
                        jobId,
                    },
                    {
                        headers: {
                            access_token: localStorage.getItem('access_token'),
                        },
                    }
                );
                this.bookmarks.push(response.data.data); // Menambahkan favorite ke state
                Swal.fire("Success!", "Success add to bookmark!", "success");
                return response;
            } catch (error) {
                console.error(error);
                new Swal("Warning!", error.response.data.message, "warning");
            }
        },
        async fetchBookmark(id) {
            try {
                const response = await Axios.get(`https://jobbet-production.up.railway.app/pub/bookmarks/${id}`, {
                    headers: {
                        access_token: localStorage.getItem('access_token'),
                    },
                });

                this.bookmarks = response.data; // Mengupdate state dengan daftar favorites dari server
                return response;
            } catch (error) {
                console.log(error);
            }
        },

    },
});
