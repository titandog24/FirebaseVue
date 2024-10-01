import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../../firebaseConfig";
import router from "../router/router";

export const useUserStores = defineStore("register", () => {
  const userDB = ref({
    userData: null,
  });
  const isLoading = ref(false);

  const registerUser = async (email, password) => {
    isLoading.value = false;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      userDB.value.userData = { email: user.email, uid: user.uid };
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid })
      );
    } catch (error) {
      console.log(error);
      return error.code;
    } finally {
      isLoading.value = false;
    }
  };

  const loginUser = async (email, password) => {
    isLoading.value = true;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid })
      );
      router.push("/");
    } catch (error) {
      return error.code;
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      userDB.value.userData = null;
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const authStateChangedPromise = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            userDB.value.userData = { email: user.email, uid: user.uid };
            resolve(user);
          } else {
            userDB.value.userData = null;
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        }
      );
      return unsubscribe;
    });
  };

  const getAuthUser = async () => {
    try {
      const user = await authStateChangedPromise();
      return user;
    } catch (error) {
      console.error("Error en el estado de autenticación:", error);
      return null;
    }
  };

  const obtenerMesajeError = async (error) => {
    switch (error) {
      case "auth/invalid-credential":
        return "Credenciales incorrectos";
      case "auth/email-already-exists":
        return "El correo ya existe";
      case "auth/email-already-in-use":
        return "Este correo ya está siendo utilizado";
      case "auth/invalid-email":
        return "La propiedad email es inválida";
      case "auth/invalid-password":
        return "La propiedad password es inválida";
      case undefined:
        return "";
      default:
        return "ocurrió un error";
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    getAuthUser,
    userDB,
    isLoading,
    obtenerMesajeError,
  };
});
