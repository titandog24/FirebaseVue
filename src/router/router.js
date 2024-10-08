import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import { useUserStores } from "../store/user";
import { storeToRefs } from "pinia";
import EditarView from "../views/EditarView.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStores();
  const {isLoading} = storeToRefs(userStore);
  isLoading.value = true;

  const user = await userStore.getAuthUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  isLoading.value = false;
};

const routes = [
  {
    path: "/",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/editar/:id",
    component: EditarView,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
