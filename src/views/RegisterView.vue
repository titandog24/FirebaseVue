<script setup>

import { ref } from 'vue';
import {useUserStores} from '../store/user'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

    const email = ref('');
    const pasword = ref('')
    const router = useRouter();
    const userEvent = useUserStores();
    const {registerUser} = userEvent;
    const {userDB, isLoading} = storeToRefs(userEvent)

    const handleSubmit = async () => {
        if (!email.value || !pasword.value) {
            console.log('Existen un campo vacío');
            return;
        }        
       const userRegistred = await registerUser(email.value, pasword.value)
       if (userRegistred && userRegistred.uid) {
            console.log(userRegistred);
            router.push('/');
       }
    }
</script>

<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese el email" v-model.trim="email">
            <input type="password" placeholder="password" v-model.trim="pasword">
            <button type="submit" :disabled="isLoading">Crear usuario</button>
        </form>
    </div>
</template>