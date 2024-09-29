<script setup>
import { storeToRefs } from 'pinia';
import { useUserStores } from '../store/user';
const userStore = useUserStores()
const {userDB} = storeToRefs(userStore)

</script>

<template> 
    <div>
        <h1>
            hola
        </h1>
        <p>{{userDB.userData}}</p>
    </div>
</template>