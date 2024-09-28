import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
/*keys in firebase*/
};

initializeApp(firebaseConfig);

const auth = getAuth();
export {auth}