import { createRouter, createWebHistory } from "vue-router";
import { ROLES } from "../constants/roles";
import { useAuthStore } from "../store/auth.store";
import { pinia } from "../store";

const routes = [
  {
    path: "/login",
    name: "user-login",
    component: () => import("../components/nguoidung/Login/index.vue"),
    meta: { layout: "blank", guestOnly: true },
  },
  {
    path: "/quen-mat-khau",
    name: "user-forgot-password",
    component: () => import("../components/nguoidung/quen-mat-khau/index.vue"),
    meta: { layout: "blank", guestOnly: true },
  },
  {
    path: "/doi-mat-khau",
    name: "user-reset-password",
    component: () => import("../components/nguoidung/doi-mat-khau/index.vue"),
    meta: { layout: "blank", guestOnly: true },
  },
  {
    path: "/dang-ky",
    name: "user-register",
    component: () => import("../components/nguoidung/dang-ky/index.vue"),
    meta: { layout: "blank", guestOnly: true },
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("../components/admin/Login/index.vue"),
    meta: { layout: "blank", guestOnly: true },
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "nguoidung", requiresAuth: true, roles: [ROLES.USER] },
  },
  {
    path: "/library",
    name: "library",
    component: () => import("../views/LibraryView.vue"),
    meta: { layout: "nguoidung", requiresAuth: true, roles: [ROLES.USER] },
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/HistoryView.vue"),
    meta: { layout: "nguoidung", requiresAuth: true, roles: [ROLES.USER] },
  },
  {
    path: "/profile",
    name: "user-profile",
    component: () => import("../views/nguoidung/ProfileView.vue"),
    meta: { layout: "blank", requiresAuth: true, roles: [ROLES.USER] },
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: () => import("../views/admin/DashboardView.vue"),
    meta: { layout: "admin", requiresAuth: true, roles: [ROLES.ADMIN] },
  },
  {
    path: "/admin/profile",
    name: "admin-profile",
    component: () => import("../views/admin/ProfileView.vue"),
    meta: { layout: "blank", requiresAuth: true, roles: [ROLES.ADMIN] },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const getHomeByRole = (role) => {
  if (role === ROLES.ADMIN) {
    return "/admin/dashboard";
  }
  return "/library";
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let hasHydratedAuth = false;

router.beforeEach((to) => {
  const authStore = useAuthStore(pinia);
  if (!hasHydratedAuth) {
    authStore.hydrate();
    hasHydratedAuth = true;
  }

  const hasValidRole = authStore.role === ROLES.ADMIN || authStore.role === ROLES.USER;
  const isAuthenticated = authStore.isAuthenticated && hasValidRole;

  if (to.meta.guestOnly && isAuthenticated) {
    return getHomeByRole(authStore.role);
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    const loginPath = to.path.startsWith("/admin") ? "/admin/login" : "/login";
    if (to.path === loginPath) {
      return true;
    }
    return { path: loginPath, query: { redirect: to.fullPath } };
  }

  if (to.meta.roles?.length && !to.meta.roles.includes(authStore.role)) {
    if (!isAuthenticated) {
      return to.path.startsWith("/admin") ? "/admin/login" : "/login";
    }

    const fallback = getHomeByRole(authStore.role);
    if (fallback === to.path) {
      return "/login";
    }
    return fallback;
  }

  return true;
});

export default router;
