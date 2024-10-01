<script setup>

import { ref, reactive } from 'vue';
import { useUserStores } from '../store/user'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const userEvent = useUserStores();

const formState = reactive({
    email: '',
    password: '',
    confirmPassword: ''
})
const { registerUser, obtenerMesajeError } = userEvent;
const { isLoading } = storeToRefs(userEvent)
const verError = ref(false);
const mensajeError = ref('');

const onFinish = async (value) => {
    if (!formState.email || !formState.password) {
        verError.value = true;
        mensajeError.value = 'Existen un campo vacío';
        return;
    }
    const userRegistred = await registerUser(formState.email, formState.password)
    const mensaje = await obtenerMesajeError(userRegistred)

    if (mensaje == '') {
        console.log(userRegistred);
        router.push('/');
    } else {
        verError.value = true;
        mensajeError.value = mensaje;
    }
}

const onFinishFailed = async (value) => {
    console.log(value);
}

const validatePass = async (_rule, value) => {
  if (formState.confirmPassword === '') {
    return Promise.reject('repita contraseña')
  }
  
  if (formState.confirmPassword !== formState.password) {
    return Promise.reject('No coinciden las contraseñas');
  }
  return Promise.resolve();
}


</script>

<template>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" :style="{ textAlign: 'center' }">
            <h1>Registrar usuarios</h1>
            <div v-if="verError">
                {{ mensajeError }}
            </div>
        </a-col>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }" :style="{ textAlign: 'center' }">
            <a-form name="basiclogin" autocomplete="off" layout="vertical" @finish="onFinish"
                @finishFailed="onFinishFailed" :model="formState">
                <div>
                    <a-form-item label="Ingresa tu correo" name="email"
                        :rules="[{ Required: true, message: 'Ingresa tu email', whitespace: true, type:'email'  }]">
                        <a-input v-model:value="formState.email"></a-input>
                    </a-form-item>
                </div>
                <div>
                    <a-form-item label="Ingresa tu password" name="password"
                        :rules="[{ Required: true, message: 'Ingresa tu password', min: 6, whitespace: true }]">
                        <a-input-password v-model:value="formState.password" type="password"></a-input-password>
                    </a-form-item>
                    <a-form-item has-feedback label="Confirma tu contraseña" name="checkPass"
                        :rules="[{
                            required: true,
                            min:6,
                            whitespace: true,
                            validator: validatePass,
                        }]">
                        <a-input v-model:value="formState.confirmPassword" type="password" autocomplete="off" />
                    </a-form-item>
                </div>
                <div>
                    <a-button type="primary" :disabled="isLoading" html-type="submit">Guardar</a-button>
                </div>
            </a-form>
        </a-col>
    </a-row>
</template>