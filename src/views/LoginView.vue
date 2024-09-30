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

    if (!existeElUsuario) {
        mensajeError.value = `No existe el usuario ${email.value} - ${password.value}`;
        verError.value = true;
        return
    }
}
</script>

<template>
    <div>
        <div>
            <h1>Login</h1>
            <div v-if="verError">
                {{ mensajeError }}
            </div>
        </div>
        <div>
            <form @submit.prevent="loguearse">
                <div>
                    <input type="email" placeholder="Ingrese el email" v-model.trim="email">
                </div>
                <div>
                    <input type="password" placeholder="password" v-model.trim="password">
                </div>
                <div>
                    <button type="submit" :disabled="isLoading">Crear usuario</button>
                </div>
            </form>
        </div>
    </div>
</template>