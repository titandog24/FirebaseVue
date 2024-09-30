<script setup>

import { RouterLink } from 'vue-router';
import { useUserStores } from './store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStores();
const { userDB, isLoading } = storeToRefs(userStore);

</script>

<template>
  <nav>
    <div>
      <RouterLink to="/">Firebase APP</RouterLink>
      <div v-if="!userDB.userData && !isLoading ">
        <RouterLink to="/login" v-if="!userDB.userData">Login</RouterLink>
        <RouterLink to="/register" v-if="!userDB.userData">Register</RouterLink>
      </div>
      <div v-if="userDB.userData && !isLoading">
        <RouterLink to="/">Home</RouterLink>
        <button @click="userStore.logoutUser" v-if="userDB.userData">Logout</button>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>
