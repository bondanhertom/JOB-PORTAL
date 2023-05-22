import { defineStore } from 'pinia'
import Axios from 'axios'
import Swal from "sweetalert2";
export const useRegisterStore = defineStore('register', {
    // other options...
    state: () => ({ //data() dikomponenen
    }),
    getters: { //seperti compute di komponen
    },
    actions: { //seperti method di komponene
        async handleRegister(value) {
            try {
                const { data } = await Axios({
                    url: 'https://jobbet-production.up.railway.app/pub/users/register',
                    method: 'post',
                    data: {
                        email: value.email,
                        password: value.password,
                    },
                })
                this.router.push("/login") //dimakraw
            } catch (error) {
                new Swal("Error", error.response.data.message, "error");
            }
        }
    },
})
