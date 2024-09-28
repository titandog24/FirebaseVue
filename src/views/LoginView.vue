<script setup>

import { ref } from 'vue';
import { useUserStores } from '../store/user';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const email = ref('');
const password = ref('');
const verError = ref(false);
const mensajeError = ref('');
const router = useRouter();
const { loginUser } = useUserStores();
const useStores = useUserStores();
const { isLoading } = storeToRefs(useStores);

const loguearse = async () => {
    if (!email.value || !password.value) {
        mensajeError.value = "Los campos no pueden ser vacíos";
        verError.value = true;
        return
    }
    const existeElUsuario = await loginUser(email.value, password.value);

    if (existeElUsuario && existeElUsuario.uid) {
        router.push('/')
    } else {
        mensajeError.value = `No existe el usuario ${email.value} - ${password.value}`;
        verError.value = true;
        return
    }
}
</script>

<template>
    <div class="container text-center">
        <div class="row mb-5">
            <h1>Login</h1>
            <div class="alert alert-danger" v-if="verError">
                {{ mensajeError }}
            </div>
        </div>
        <div class="row col-md-6 mx-auto">
            <form @submit.prevent="loguearse">
                <div class="mb-3">
                    <input type="email" class="form-control" placeholder="Ingrese el email" v-model.trim="email">
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="password" v-model.trim="password">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" type="submit" :disabled="isLoading">Crear usuario</button>
                </div>
            </form>
        </div>
    </div>
</template>