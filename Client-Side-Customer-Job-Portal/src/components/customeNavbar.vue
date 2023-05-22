<script>

import { mapWritableState, mapGetters } from 'pinia'
import { useLoginStore } from '../stores/login'
import { useBookmarkStore } from '../stores/bookmark'
import { useJobStore } from '../stores/job'
import Swal from "sweetalert2";
export default {
    name: "customeNavbar",
    data() {
        return {
            searchQuery: ''
        }
    },

    methods: {
        search() {
            useJobStore().searchCards(this.searchQuery)
        },
        handleHome() {
            this.$router.push('/dashboard')
        },
        handleLogin() {
            this.$router.push('/login')

        },
        handleRegister() {
            this.$router.push('/register')

        },
        handleBookmark() {
            this.$router.push('/bookmark')

        },
        handleLogout() {
            Swal.fire({
                title: 'Are you sure you want to logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Logout',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    this.$router.push('/login');
                    this.isLogin = false;
                    this.isBookmark = false;
                    this.isRegister = false;
                    Swal.fire({
                        title: 'Logged Out!',
                        text: 'You have successfully logged out',
                        icon: 'success',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
            });
        }

    },
    computed: {
        ...mapWritableState(useLoginStore, ['isLogin']),
        ...mapWritableState(useBookmarkStore, ['isBookmark']),
        ...mapGetters(useJobStore, ['filteredCards'])
    },
    created() {
        if (localStorage.access_token) {
            this.isLogin = true
            this.isBookmark = true
            this.isRegister = true
        }
    }


}
</script>
<template>
    <nav>
        <div class="logo">
            <img src="../assets/logo.png" alt="Logo">
        </div>
        <div>
            <form v-if="$route.path !== '/login' && $route.path !== '/register'" @submit.prevent="search">
                <input type="text" v-model="searchQuery" placeholder="Search..." @input="search" />
                <button type="submit"></button>
            </form>
            <ul>
                <li v-for="card in filteredCards" :key="card.id">
                    {{ card.name }}
                </li>
            </ul>
        </div>
        <ul>
            <li><a href="#" @click.prevent="handleHome"><i class="material-icons">home</i> Home</a></li>
            <li><a href="#" @click.prevent="handleBookmark" v-if="isLogin"><i class="material-icons">bookmark</i> My
                    Bookmark</a></li>
            <li><a href="#" v-if="!isLogin" @click.prevent="handleLogin"><i class="material-icons">person</i> Sign In</a>
            </li>
            <li><a href="#" v-if="!isLogin" @click.prevent="handleRegister"><i class="material-icons">person_add</i> Sign
                    Up</a></li>
            <li><a href="#" @click.prevent="handleLogout" v-if="isLogin"><i class="material-icons">exit_to_app</i>
                    Logout</a></li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #0D3880;
    z-index: 9999;
    padding: 0.4rem;
    box-shadow: 0px 1px 4px rgba(234, 230, 230, 0.1);
}

nav .logo {
    width: 10%;
    height: auto;
    max-height: 50px;
    /* adjust this value to the desired height */
}


nav form {
    display: flex;
    align-items: center;
    margin: 0 auto;
    border: #333;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav .logo {
    flex: 1;
    max-width: 8%;
    height: auto;
    max-height: 60px;
    /* adjust this value to the desired height */
}

nav form {
    flex: 2;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
}

nav form input[type="text"] {
    width: 100%;
    padding: 0.75rem;
    font-size: 1.25rem;
    border: 2px solid rgb(228, 222, 222);
    background-color: #E2E2E2;
    border-radius: 28px;
    margin-right: 0.5rem;
}


nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

nav li {
    margin-right: 1.5rem;
    margin-top: 1rem;

}

nav a {
    color: #fbf7f7;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    border-bottom: 2px solid transparent;
}

nav a:hover {
    color: #FFDC6B;
    border-bottom: 2px solid #0c78de;
}
</style>
