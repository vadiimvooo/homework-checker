import {createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized} from 'vue-router'
import User from "@/pages/User.vue";
import Admin from "@/pages/Admin.vue";
import Auth from "@/pages/Auth.vue";

function UserGuard(_: RouteLocationNormalized, __: RouteLocationNormalized, next: NavigationGuardNext) {
  let isAuthenticated= false;
  const userData = localStorage.getItem("sb-ylaqgqguaxteixfjjlaj-auth-token");
  let user = null;

  if (userData) {
    user = JSON.parse(userData).user;
  }

  const isAdmin = user?.user_metadata.role as string | null;

  if(user) {
    isAuthenticated = true;
  }

  if(isAuthenticated && isAdmin) {
    next('/admin');
  }
  else if(isAuthenticated) {
    next();
  }
  else {
    next('/auth');
  }
}

function AuthGuard(_: RouteLocationNormalized, __: RouteLocationNormalized, next: NavigationGuardNext) {
  let isAuthenticated= false;
  const userData = localStorage.getItem("sb-ylaqgqguaxteixfjjlaj-auth-token");
  let user = null;

  if (userData) {
    user = JSON.parse(userData).user;
  }

  const isAdmin = user?.user_metadata.role as string | null;

  if(user) {
    isAuthenticated = true;
  }

  if(isAuthenticated && isAdmin) {
    next('/admin');
  }
  else if (isAuthenticated) {
    next('/home');
  } else {
    next();
  }
}

function AdminGuard(_: RouteLocationNormalized, __: RouteLocationNormalized, next: NavigationGuardNext) {
  let isAuthenticated= false;
  const userData = localStorage.getItem("sb-ylaqgqguaxteixfjjlaj-auth-token");
  let user = null;

  if (userData) {
    user = JSON.parse(userData).user;
  }

  const isAdmin = user?.user_metadata.role as string | null;

  if(user) {
    isAuthenticated = true;
  }

  if(isAuthenticated && isAdmin) {
    next();
  }
  else {
    next('/auth');
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'house',
      component: User,
      beforeEnter: UserGuard,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      beforeEnter: AuthGuard
    },
    {
      path: '/home',
      name: 'home',
      component: User,
      beforeEnter: UserGuard,
      redirect: '/',
      children: []
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: AdminGuard
    }
  ]
})

export default router
