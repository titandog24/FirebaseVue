<script setup>
import { storeToRefs } from 'pinia';
import { useUserStores } from '../store/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStores()
const {obtenerUsuario} = userStore;
const {userDB} = storeToRefs(userStore)

const validarUsuario = async (params) => {
    await obtenerUsuario();

    if (!userDB.value || !userDB.value.userData) {
        router.push('/login');
    }   
}
validarUsuario();
</script>

<template> 
    <div>
        <h1>
            hola
        </h1>
        <p>{{userDB.userData}}</p>
    </div>
</template>