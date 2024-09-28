<script setup>

import { RouterLink } from 'vue-router';
import { useUserStores } from './store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStores();
userStore.obtenerUsuario();
const { userDB } = storeToRefs(userStore);
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Firebase APP</RouterLink>
      <form class="d-flex" role="search">
        <RouterLink class="btn btn-outline-primary m-1" to="/">Home</RouterLink>
        <RouterLink class="btn btn-outline-primary m-1" to="/login" v-if="!userDB.userData">Login</RouterLink>
        <RouterLink class="btn btn-outline-primary m-1" to="/register" v-if="!userDB.userData">Register</RouterLink>
        <button class="btn btn-danger m-1" @click="userStore.logoutUser" v-if="userDB.userData">Logout</button>
      </form>
    </div>
  </nav>
  <router-view></router-view>
</template>
