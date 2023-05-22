
<script>

export default {
    props: ["page", "changePage"],

    emits: ["handleLogout", "fetchJob", "fetchHome", "fetchCompany", "logHistory"],
    methods: {
        handleLogout() {
            this.$emit("handleLogout")
        },
        fetchJob() {
            this.$emit("fetchJob")
            this.changePage("job-section")
        },
        fetchHome() {
            // this.$emit("fetchHome")
            this.changePage("dashboard-section")
        },
        fetchCompany() {
            this.$emit("fetchCompany")
            this.changePage("company-section")
        },
        logHistory() {
            this.$emit("logHistory")
            this.changePage("history-section")
        },
    },


}
</script>

<template>
    <section id="navbar-section">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">

                <a class="navbar-brand" href="#">
                    <img src="../assets/logo.png"
                        class="logo">| ADMIN PANEL</a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav"
                    v-if="page !== 'login-section' && page !== 'register-section'">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" @click="fetchHome()">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="fetchJob()">Jobs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="fetchCompany()">Company</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="logHistory()">Log</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="handleLogout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>
</template>

<!-- <style scoped>
.logo {
    width: 70px;
    height: auto;
}
</style> -->


<style scoped>
.logo {
    width: 80px;
    height: auto;
    margin-right: 10px;
}

#navbar-section {
    margin-bottom: 30px;
}

.navbar-brand {
    font-size: 17px;
    font-weight: bold;

}

.navbar-toggler-icon {
    background-color: black;
    width: 24px;
    height: 2px;
}

.navbar-nav {
    font-size: 16px;
}

.nav-item {
    margin-right: 20px;
}

.nav-link {
    color: black;
    font-weight: bold;
}

.nav-link:hover {
    color: #007bff;
}

.active {
    color: #007bff;
}
</style>
