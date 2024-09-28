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
    <div class="container text-center">
        <div class="row mb-5">
            <h1>Register</h1>
        </div>
        <div class="row col-md-6 mx-auto">
            <form @submit.prevent="handleSubmit">
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