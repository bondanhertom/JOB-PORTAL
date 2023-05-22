<script>
import { GoogleLogin } from "vue3-google-login";
import Button from "../components/button.vue"
export default {
    components: {
        Button,
        GoogleLogin
    },
    emits: ["handleLogin", "changePage", "handleLoginGoogle"],
    data() {
        return {
            // name: "Register Here",
            inputLogin: {
                email: "",
                password: "",
            },
            page: "login-section",
        };
    },
    methods: {
        handleLogin() {
            this.$emit("handleLogin", this.inputLogin);
        },

        handleLoginGoogle(value) {
            console.log(value);
            const token = value.credential;
            this.$emit("handleLoginGoogle", token);
        },
        changePage(page) {
            this.$emit("changePage", page);
        },
    },
};
</script>

<template>
    <section class="container" id="login-section">
        <div class="login-container">
            <h1 class="login-title">Login</h1>
            <form class="login-form" id="form-login" @submit.prevent="handleLogin">
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
            <br>
            <a href="#">
                <GoogleLogin :callback="handleLoginGoogle" />
            </a>

            <p class="login-register-link">Don't have an account yet? <Button :name="'Register Here'"
                    @changePage="changePage('register-section')" /></p>
            <div>
            </div>
        </div>
    </section>
</template>



<style scoped>
.login-register-link {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #555;
    margin-top: 10px;
    opacity: 0.9;
}

.login-container {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.7);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

}

.login-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 27px;
    text-align: center;
    background: linear-gradient(to right, #A71185 33%, #DA6B45 33%, #f06b8f 66%, #8366A4 66%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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

.login-register-link {
    margin-top: 20px;
    text-align: center;
}

button {
    background-color: #fa9776;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
}

button:hover {
    background-color: #f6baa6;
    opacity: 1.0;
}
</style>