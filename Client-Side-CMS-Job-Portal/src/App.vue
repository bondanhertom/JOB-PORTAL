<script>
import Home from "./pages/home.vue"
import Login from "./pages/login.vue"
import Navbar from "./components/navbar.vue"
import Job from "./pages/jobs.vue"
import Company from "./pages/company.vue"
import History from "./pages/history.vue"
import Register from "./pages/register.vue"
import AddJob from "./pages/addJob.vue"
import UpdateJob from "./pages/updateJob.vue"
import AddCompany from "./pages/addCompany.vue"

import JobForm from "./components/jobForm.vue"

import axios from "axios";
import Swal from 'sweetalert2'

axios.defaults.baseURL = 'https://jobbet-production.up.railway.app';

export default {
  components: {
    Home,
    Login,
    Navbar,
    Job,
    Company,
    History,
    Register,
    AddJob,
    UpdateJob,
    AddCompany,
    JobForm
  },
  data() {
    return {
      jobs: [],
      companies: [],
      histories: [],
      page: "login-section",
      // formType: 'job-add',
      selectedJob: null,
      access_token: localStorage.access_token || "",
    }
  },

  created() {
    // periksa apakah ada access token yang tersimpan di local storage
    if (!localStorage.getItem('access_token')) {
      this.changePage("login-section");
    } else {
      this.access_token = localStorage.getItem('access_token');
      this.fetchJob();
      this.logHistory()
      this.fetchCompany();
      this.changePage("dashboard-section");
    }
  },

  methods: {
    changePage(page) {
      this.page = page
    },

    handleRegister(value) {
      axios({
        method: 'POST',
        url: '/users/register',
        data: value
      })
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'You have successfully registered!',
            icon: 'success',
          }).then(() => {
            this.changePage("login-section");
          });
        })
        .catch((error) => {
          new Swal("Error", error.response.data.message, "error");
        })
    },


    handleLoginGoogle(value) {
      axios({
        method: "POST",
        url: '/users/google-sign-in',
        headers: {
          token_google: value
        }
      })
        .then((response) => {
          console.log(response);
          localStorage.setItem('access_token', response.data.access_token);
          Swal.fire({
            title: 'Success!',
            text: 'You are logged in!',
            icon: 'success',
          }).then(() => {
            this.fetchJob()
            this.fetchCompany()
            this.logHistory()
            this.changePage("dashboard-section")
          })
        })
        .catch((error) => {
          console.log(error);
          new Swal("Error", error.response.data.message, "error");
        });

    },
    handleLogin(value) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: value.email,
          password: value.password
        }
      })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token);
          Swal.fire({
            title: 'Success!',
            text: 'You are logged in!',
            icon: 'success',
          }).then(() => {
            this.fetchJob()
            this.fetchCompany()
            this.logHistory()
            this.changePage("dashboard-section")
          })
        })
        .catch((error) => {
          console.log(error);
          new Swal("Error", error.response.data.message, "error");
        });
    },

    handleLogout() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("access_token");
          this.changePage("login-section"); // tambahkan `this` di depan `changePage()`
        }
      })
    },
    logHistory() {
      axios({
        method: "GET",
        url: '/histories',
        data: {},
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then((result) => {
          console.log(result.data);
          this.histories = result.data
        })
        .catch((error) => {
          new Swal("Error", error.response.data.message, "error");
        })
    },


    fetchJob() {
      axios({
        method: 'GET',
        url: '/jobs',
        data: {},
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then((result) => {
          console.log(result.data);
          this.jobs = result.data;
        })
        .catch((error) => {
          new Swal("Error", error.response.data.message, "error");
        })
    },

    updateJobStatus(job) {
      axios({
        method: 'PATCH',
        url: `/jobs/${job.id}/status`,
        data: {
          status: job.status
        },
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      })

        .then((response) => {
          console.log(response);
          Swal.fire({
            title: 'Success!',
            text: response.data.message,
            icon: 'success',
          }).then(() => {
            this.fetchJob()
          });
        })
        .catch((error) => {
          new Swal("Error", error.response.data.message, "error");
        });

    },


    fetchCompany() {
      axios({
        method: 'GET',
        url: '/companies',
        data: {},
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then((result) => {
          console.log(result.data);
          this.companies = result.data;
        })
        .catch((error) => {
          new Swal("Error", error.response.data.message, "error");
        })
    },

    addJob(value) {
      axios({
        method: 'POST',
        url: '/jobs',
        data: value,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then((response) => {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          }).then(() => {
            this.fetchJob()
            this.changePage('job-section')
          });
        })
        .catch((error) => {
          console.log(error);
          new Swal("Error", error.response.data.message, "error");
        })
    },

    editJob(job) {
      // this.formType = 'job-update';
      this.selectedJob = job;
      this.page = 'job-update';
      console.log(job);

    },

    updateJob(job) {
      axios({
        method: 'PUT',
        url: `/jobs/${job.id}`,
        data: job,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: 'Success!',
            text: 'Suscess Update',
            icon: 'success',
          }).then(() => {
            this.page = 'job-section';
            this.fetchJob();
          })
        })
        .catch(error => {
          console.log(error);
          new Swal("Error", error.response.data.message, "error");
        });
    },

    addCompany(value) {
      axios({
        method: 'POST',
        url: '/companies',
        data: value,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then((response) => {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          }).then(() => {
            this.fetchCompany()
            this.changePage('company-section')
          });
        })
        .catch((error) => {
          console.log(error);
          new Swal("Error", error.response.data.message, "error");
        })
    },

  },

}
</script>

<template>
  <Register @handleRegister="handleRegister" v-if="page === 'register-section'" />

  <Login @handleLoginGoogle="handleLoginGoogle" @handleLogin="handleLogin" @changePage="changePage"
    v-if="page === 'login-section'" />


  <Navbar @fetchCompany="fetchCompany" @logHistory="logHistory" @fetchJob="fetchJob" @handleLogout="handleLogout"
    :page="page" :changePage="changePage" />

  <Home v-if="page === 'dashboard-section'" :jobs="jobs" :companies="companies" :histories="histories" />

  <Company v-if="page === 'company-section'" :companies="companies" @changePage="changePage" />
  <History v-if="page === 'history-section'" :histories="histories" />




  <Job v-if="page === 'job-section'" :jobs="jobs" :companies="companies" @editJob="editJob"
    @updateJobStatus="updateJobStatus($event)" @changePage="changePage" />

  <AddJob v-if="page === 'job-add'" :page="page" :companies="companies" @addJob="addJob" @changePage="changePage
  " />

  <UpdateJob v-if="page === 'job-update'" :page="page" :companies="companies" :job="selectedJob" @updateJob="updateJob"
    @fetchCompany="fetchCompany"  @changePage="changePage" />


  <AddCompany v-if="page === 'company-add'" @addCompany="addCompany"  @changePage="changePage" />
</template>

<style scoped></style>
