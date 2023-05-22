<script>
import { RouterLink } from 'vue-router'
import { mapActions } from 'pinia'
import { useLoginStore } from "../stores/login"
import { GoogleLogin } from "vue3-google-login";
export default {
    name: "LoginPage",
    components: { GoogleLogin },
    data() {
        return {
            inputLogin: {
                email: "",
                password: "",
            },
            
        };
    },
    methods: {
        ...mapActions(useLoginStore, ['handleLogin', 'googleLogin']),

        submitHandler() {
            this.handleLogin({
                email: this.inputLogin.email,
                password: this.inputLogin.password
            })
        }
    },
};
</script>
<template>
    <section class="container" id="login-section">
        <div class="login-container">
            <h1 class="login-title">Login</h1>
            <form class="login-form" id="form-login" @submit.prevent="submitHandler">
                <div class="form-group">
                    <label for="email"><i class="material-icons">email</i>Email</label>
                    <input type="email" id="email" v-model="inputLogin.email" class="form-control"
                        placeholder="Enter your email...">
                </div>
                <div class="form-group">
                    <label for="password"><i class="material-icons">lock</i>Password</label>
                    <input type="password" id="password" v-model="inputLogin.password" class="form-control"
                        placeholder="Enter your pasword...">
                </div>
                <button type="submit" class="btn btn-primary"><span class="material-icons">login</span>Login</button>
            </form>

            <div class="login-options">
                <a href="#" class="d-flex justify-content-center mb-1">
                    <GoogleLogin :callback="googleLogin" class="google-login-button" />
                </a>
                <p class="register-link">Don't have an account yet?<RouterLink style="color: blue;" to="/register">
                        Register Here</RouterLink>
                </p>
            </div>
        </div>
    </section>
</template>


<style scoped>
.register-link {
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
    display: block;
    text-align: center;
}

.google-login-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}


.login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.7);
    padding: 2rem;
    margin-top: 2.5rem;
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
    margin-top: 10px;
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