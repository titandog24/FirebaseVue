<script setup>

import { RouterLink, useRoute } from 'vue-router';
import { useUserStores } from './store/user';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const route = useRoute();
const userStore = useUserStores();
const { userDB, isLoading } = storeToRefs(userStore);



const selectedKeys1 = ref(['login'])
watch(() => route.name, () =>selectedKeys1.value = [route.name])
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="login" v-if="!userDB.userData && !isLoading">
          <RouterLink to="/login">Iniciar sesión</RouterLink>
        </a-menu-item>
        <a-menu-item key="register" v-if="!userDB.userData && !isLoading">
          <RouterLink to="/register">Registarse</RouterLink>
        </a-menu-item>
        <a-menu-item key="home" v-if="userDB.userData && !isLoading">
          <RouterLink to="/">Inicio</RouterLink>
        </a-menu-item>
        <a-menu-item key="logout" @click="userStore.logoutUser"
        v-if="userDB.userData && !isLoading">Cerrar sesión</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px;">
      <div :style="{background: '#fff', padding: '24px', minHeight: '280px'}">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>
