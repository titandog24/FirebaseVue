<script setup>
import { useRoute } from 'vue-router';
import { useDataBaseStore } from '../store/database';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const url = ref('')
const shorts = ref('')

const router = useRoute();
const DatabaseStore = useDataBaseStore();
const {docEdit, loading} = storeToRefs(DatabaseStore);

const cargarDatos = async (params) => {
    await DatabaseStore.getDocById(router.params.id);
    url.value = docEdit.value.name;
    shorts.value = docEdit.value.short;
}
cargarDatos();

const handleEdit = async () => {
    const user = docEdit.value.user
    const objEdit = {
        name: url.value,
        short: shorts.value,
        user: user
    }
    await DatabaseStore.editDocById(objEdit, router.params.id);
}

</script>

<template>
    <div class="container">
        <h1 class="mx-auto text-center">Editar</h1>
        <div class="row col-md-6 mx-auto mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                v-model="url" />
            <label for="" class="form-label">Short</label>
            <input type="text" class="form-control mb-3" name="" id="" aria-describedby="helpId" placeholder=""
                v-model="shorts" />
            <button class="btn btn-warning" @click="handleEdit" :disabled="loading">Edit</button>
        </div>
    </div>
</template>