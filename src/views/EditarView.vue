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
    <div >
        <h1>Editar</h1>
        <div>
            <label for="">Name</label>
            <input type="text" name="" id="" placeholder=""
                v-model="url" />
            <label for="">Short</label>
            <input type="text" name="" id="" placeholder=""
                v-model="shorts" />
            <button @click="handleEdit" :disabled="loading">Edit</button>
        </div>
    </div>
</template>