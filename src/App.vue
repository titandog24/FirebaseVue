<script setup>

import { RouterLink } from 'vue-router';
import { useUserStores } from './store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStores();
userStore.obtenerUsuario();
const {userDB} = storeToRefs(userStore);
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/login">Login</RouterLink> |
    <RouterLink to="/register">Register</RouterLink>
    <button class="btn btn-danger" @click="userStore.logoutUser" v-if="userDB.userData">Logout</button> 
  </nav>
  <router-view></router-view>
</template>

