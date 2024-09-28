import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq0SymWN5b_94EM37omlJwLbzMw6XHfb0",
  authDomain: "fir-vue-75c97.firebaseapp.com",
  projectId: "fir-vue-75c97",
  storageBucket: "fir-vue-75c97.appspot.com",
  messagingSenderId: "191158557543",
  appId: "1:191158557543:web:5f7cff9c3e17854c5a6dc2"
};

initializeApp(firebaseConfig);

const auth = getAuth();
export {auth}