<script>
import { RouterLink, RouterView } from 'vue-router'
//import Home from "./views/home.vue"
import customeNavbar from "./components/customeNavbar.vue";

export default {
  name:"App",
  
  components:{
    customeNavbar
  },

}
</script>

<template>
<customeNavbar />
<RouterView></RouterView>
</template>

<style>
</style>
