import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 /*API KEY FIREBASE*/
};

initializeApp(firebaseConfig);

const auth = getAuth();
export {auth}