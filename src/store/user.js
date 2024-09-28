import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../../firebaseConfig";
import router  from "../router/router";

export const useUserStores = defineStore('register', () => {
    const userDB = ref({
        userData: null
    })
    const isLoading = ref(false)

    const registerUser = async (email, password) => {
        isLoading.value = false;
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            userDB.value.userData = {email: user.email, uid: user.uid}
            localStorage.setItem('user',JSON.stringify({email: user.email, uid: user.uid}))
            return user;
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    }

    const loginUser = async (email, password) => {
        isLoading.value = true;
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user',JSON.stringify({email: user.email, uid: user.uid}))
            return user;
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    }

    const logoutUser = async () => {
        try {
            await signOut(auth);
            userDB.value.userData = null
            localStorage.clear();
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerUsuario = async(email = "", password = "") => {
        isLoading.value = true;
        try {
            const usuarioLocalStorage = localStorage.getItem('user');
            if (usuarioLocalStorage !== null) {
                userDB.value.userData = JSON.parse(usuarioLocalStorage);
            } else if(email != '' && password != '') {
                const {user} = await signInWithEmailAndPassword(auth, email, password);       
                userDB.value.userData = {email: user.email, uid: user.uid}
                return user;
            }
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    return {registerUser, obtenerUsuario, loginUser, logoutUser, userDB, isLoading}
})