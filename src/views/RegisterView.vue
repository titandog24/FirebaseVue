<script setup>

import { ref } from 'vue';
import {useUserStores} from '../store/user'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

    const email = ref('');
    const password = ref('')
    const router = useRouter();
    const userEvent = useUserStores();
    const {registerUser} = userEvent;
    const {userDB, isLoading} = storeToRefs(userEvent)

    const handleSubmit = async () => {
        if (!email.value || !password.value) {
            console.log('Existen un campo vacío');
            return;
        }        
       const userRegistred = await registerUser(email.value, password.value)
       if (userRegistred && userRegistred.uid) {
            console.log(userRegistred);
            router.push('/');
       }
    }
</script>

<template>
    <div>
        <div>
            <h1>Register</h1>
        </div>
        <div>
            <form @submit.prevent="handleSubmit">
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