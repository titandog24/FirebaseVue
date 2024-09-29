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
    <div class="container">
        <h1>
            Home
        </h1>
        <div class="row col-md-6 mx-auto mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                v-model="url" />
            <label for="" class="form-label">Short</label>
            <input type="text" class="form-control mb-3" name="" id="" aria-describedby="helpId" placeholder=""
                v-model="short" />
            <button class="btn btn-primary" @click="handleSubmit">Save</button>
        </div>

        <p v-if="loading">cargando... </p>
        <ul class="list-group" v-else>
            <li v-for="item in documents" :key="item.id" class="list-group-item">
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
                <button class="btn btn-danger" @click="deleteDocs(item.id)">Eliminar</button>
                <RouterLink class="btn btn-warning" :to="`/editar/${item.id}`">Editar</RouterLink>

            </li>
        </ul>
    </div>
</template>