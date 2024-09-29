import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, db } from "../../firebaseConfig";
import router from "../router/router";

export const useDataBaseStore = defineStore("database", () => {
  const documents = ref([]);
  const loading = ref(false);
  const docEdit = ref({});

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
        user: auth.currentUser.uid,
      };
      const docRef = await addDoc(collection(db, "urls"), obj);

      if (docRef.id) {
        documents.value.push({
          ...obj,
          id: docRef.id,
        });
      } else {
        console.log("ocurre un problema");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDocs = async (id) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("No existe el documento");
      }
      if (docSnap.data().user !== auth.currentUser.uid) {
        throw new Error("No tiene permisos para eliminar el documento");
      }

      await deleteDoc(doc(db, "urls", id));
      documents.value = documents.value.filter((item) => item.id != id);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getDocById = async (id) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);
      const { name, short, user } = docSnap.data();
      docEdit.value = { name, short, user };
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const editDocById = async (data, id) => {
    loading.value = true;
    try {
      const docRef = doc(db, "urls", id);
      await updateDoc(docRef, data);
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    documents,
    loading,
    docEdit,
    obtenerUrls,
    addDocs,
    deleteDocs,
    getDocById,
    editDocById,
  };
});
