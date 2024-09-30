<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useDataBaseStore } from '../store/database';
import { RouterLink } from 'vue-router';

const databaseStore = useDataBaseStore();
const { obtenerUrls, addDocs, deleteDocs } = databaseStore;
const { documents, loading } = storeToRefs(databaseStore);

const url = ref('')
const short = ref('')

const handleSubmit = async () => {

    if (!url || !short) {
        console.log('Los campos no pueden ser vacíos');
        return;
    }

    await addDocs({ name: url.value, short: short.value })

}

obtenerUrls();
</script>

<template>
    <div>
        <h1>
            Home
        </h1>
        <div>
            <label for="" >Name</label>
            <input type="text" name="" id="" aria-describedby="helpId" placeholder=""
                v-model="url" />
            <label for="" >Short</label>
            <input type="text" name="" id="" aria-describedby="helpId" placeholder=""
                v-model="short" />
            <button @click="handleSubmit">Save</button>
        </div>

        <p v-if="loading">cargando... </p>
        <ul v-else>
            <li v-for="item in documents" :key="item.id" >
                <ol>
                    <li>
                        <span>{{ item.id }}</span>
                    </li>
                    <li>
                        <span>{{ item.name }}</span>
                    </li>
                    <li>
                        <span>{{ item.short }}</span>
                    </li>
                </ol>
                <button @click="deleteDocs(item.id)">Eliminar</button>
                <RouterLink :to="`/editar/${item.id}`">Editar</RouterLink>

            </li>
        </ul>
    </div>
</template>