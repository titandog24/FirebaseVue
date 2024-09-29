<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStores } from '../store/user';
import { useDataBaseStore } from '../store/database';


const databaseStore = useDataBaseStore();
const userStore = useUserStores()
const {obtenerUrls, addDocs} = databaseStore;

const {userDB} = storeToRefs(userStore)
const {documents, loading} = storeToRefs(databaseStore);

const url = ref('')
const short = ref('')

const handleSubmit = async () => {

    if (!url || !short) {
        console.log('Los campos no pueden ser vacíos');
        return;
    }

    await addDocs({name:url.value, short: short.value})
    
}

obtenerUrls();
</script>

<template> 
    <div class="container">
        <h1>
            Home
        </h1>
        <div class="row col-md-6 mx-auto mb-3">
            <label for="" class="form-label">Name</label>
            <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
                v-model="url"
            />
            <label for="" class="form-label">Short</label>
            <input
                type="text"
                class="form-control mb-3"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder=""
                v-model="short"
            />
            <button class="btn btn-primary" @click="handleSubmit">Save</button>
        </div>
        
        <p v-if="loading">cargando... </p>
        <ul v-else>
            <li v-for="item in documents" :key="item.id">
                <p>{{ item.id }}</p>
                <p>{{ item.name }}</p>
                <p>{{ item.short }}</p>
            </li>
        </ul>
    </div>
</template>