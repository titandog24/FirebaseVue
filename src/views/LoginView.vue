<script setup>

import { reactive, ref } from 'vue';
import { useUserStores } from '../store/user';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const verError = ref(false);
const mensajeError = ref('');
const router = useRouter();
const { loginUser, obtenerMesajeError } = useUserStores();
const useStores = useUserStores();
const { isLoading } = storeToRefs(useStores);

const formState = reactive({
    email: '',
    password: ''
})

const onFinish = async (value) => {
    if (!formState.email || !formState.password) {
        mensajeError.value = "Los campos no pueden ser vacíos";
        verError.value = true;
        return
    }
    const existeElUsuario = await loginUser(formState.email, formState.password);
    const mensaje = await obtenerMesajeError(existeElUsuario);

    if (mensaje !== '') {
        isLoading.value = false;
        mensajeError.value = `${mensaje}`;
        verError.value = true;
        return
    }
}

const onFinishFailed = async (value) => {
    console.log(value); 
}


</script>

<template>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" :style="{ textAlign: 'center' }">
            <h1>Login</h1>
            <div v-if="verError">
                {{ mensajeError }}
            </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" :style="{ textAlign: 'center' }">
            <a-form 
            name="basiclogin" 
            autocomplete="off" 
            layout="vertical"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            :model="formState">
                <div>
                    <a-form-item label="Ingresa tu correo" name="email"
                        :rules="[{ Required: true, message: 'Ingresa tu email', whitespace: true, type:'email'  }]">
                        <a-input v-model:value="formState.email"></a-input>
                    </a-form-item>
                </div>
                <div>
                    <a-form-item label="Ingresa tu password" name="password"
                        :rules="[{ Required: true, message: 'Ingresa tu password', min:6, whitespace: true}]">
                        <a-input-password v-model:value="formState.password" type="password"></a-input-password>
                    </a-form-item>
                </div>
                <div>
                    <a-button type="primary" :disabled="isLoading" html-type="submit">Iniciar sesion</a-button>
                </div>
            </a-form>
        </a-col>
    </a-row>
</template>