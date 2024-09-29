import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, db } from "../../firebaseConfig";

export const useDataBaseStore = defineStore("database", () => {
  const documents = ref([]);
  const loading = ref(false);

  const obtenerUrls = async () => {
    loading.value = true;
    try {
      const q = query(
        collection(db, "urls"),
        where("user", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        documents.value.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  const addDocs = async (value) => {
    try {
      const obj = {
        ...value,
        user: auth.currentUser.uid
      }      
      const docRef = await addDoc(collection(db, "urls"), obj);
      
      if (docRef.id) {
        documents.value.push({
            ...obj,
            id:docRef.id
        }) 
      } else {
       console.log('ocurre un problema');
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { documents, obtenerUrls, addDocs, loading };
});
