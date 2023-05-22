<script>
export default {
    emits: ["handleRegister"],
    data() {
        return {
            inputRegister: {
                username: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: ''
            },
        };
    },
    methods: {
        handleRegister() {
            this.$emit("handleRegister", this.inputRegister);
        },
    },
};
</script>


<template>
    <section class="container" id="register-section">
        <div class="login-container">
            <h1 class="login-title">Sign Up</h1>
            <form class="login-form" id="register-form" @submit.prevent="handleRegister">

                <div class="form-group">
                    <div class="d-flex justify-content-between">
                        <label for="register-username">Username</label>
                        <label class="text-danger text-end fw-bold">*</label>
                    </div>
                    <input type="text" class="form-control" id="register-username" placeholder="Enter your username ..."
                        v-model="inputRegister.username" />
                </div>

                <div class="form-group">
                    <div class="d-flex justify-content-between">
                        <label for="register-email">Email</label>
                        <label class="text-danger text-end fw-bold">*</label>
                    </div>
                    <input type="email" class="form-control" id="register-email" placeholder="Enter email address ..."
                        v-model="inputRegister.email" />
                </div>

                <div class="form-group">
                    <div class="d-flex justify-content-between">
                        <label for="register-password">Password</label>
                        <label class="text-danger text-end fw-bold">*</label>
                    </div>
                    <input type="password" class="form-control" id="register-password" placeholder="Enter your password ..."
                        v-model="inputRegister.password" />
                </div>

                <div class="form-group">
                    <label for="register-phone">Phone Number</label>
                    <input type="number" class="form-control" id="register-phone"
                        placeholder="Enter phone number (optional) ..." v-model="inputRegister.phoneNumber" />
                </div>

                <div class="form-group">
                    <label for="register-address">Address</label>
                    <textarea id="register-address" class="form-control" rows="3"
                        placeholder="Enter your address (optional) ..." v-model="inputRegister.address"></textarea>
                </div>
                <button type="submit" class="btn btn-primary"><i class="material-icons">person_add</i>Sign Up</button>
            </form>

        </div>
    </section>
</template>
<style scoped>
.login-container {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.7);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 30%;
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