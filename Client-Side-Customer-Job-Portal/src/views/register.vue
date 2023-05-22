
<script>

import { mapActions } from 'pinia'
import { RouterLink } from 'vue-router'
import { useRegisterStore } from "../stores/register"
export default {
    name: "RegisterPage",
    data() {
        return {
            inputRegister: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        ...mapActions(useRegisterStore, ['handleRegister']),
        submitHandler() {
            this.handleRegister({
                email: this.inputRegister.email,
                password: this.inputRegister.password,
            })

        }
    },
};
</script>


<template>
    <section class="container" id="register-section">
        <div class="login-container">
            <h1 class="login-title">Sign Up</h1>
            <form class="login-form" id="register-form" @submit.prevent="submitHandler">

                <div class="form-group">
                    <div class="d-flex justify-content-between">
                        <label for="email"><i class="material-icons">email</i>Email</label>
                    </div>
                    <input type="email" class="form-control" id="register-email" placeholder="Enter email address ..."
                        v-model="inputRegister.email" />
                </div>

                <div class="form-group">
                    <div class="d-flex justify-content-between">
                        <label for="email"><i class="material-icons">lock</i>Password</label>
                    </div>
                    <input type="password" class="form-control" id="register-password" placeholder="Enter your password ..."
                        v-model="inputRegister.password" />
                </div>
                <button type="submit" class="btn btn-primary"><i class="material-icons">person_add</i>Sign Up</button>
            </form>
            <br/>
            <p  style="text-align: center;" class="login-register-link">Already have an account? <RouterLink style='color: blue;' to="/login">Login here
                </RouterLink>
            </p>

        </div>
    </section>
</template>
<style scoped>
.form-control {
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
    line-height: 1.5;
    padding: 0.375rem 0.75rem;
    width: 100%;
}


.login-container {
    max-width: 350px;
    margin: 0 auto;
    margin-top: 5rem;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 27px;
    text-align: center;
}

.login-form .form-group {
    margin-bottom: 20px;
}

.login-form label {
    font-weight: bold;
}

.login-form input {
    border: 1px solid #495054;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
}

.login-form button {
    margin-top: 20px;
    width: 100%;
}

button {
    background-color: #104092;
    color: white;
    padding: 10px 20px;
    font-size: 20px;
    border: none;
}

button:hover {
    background-color: #02173a;
    opacity: 1.0;
}
</style>