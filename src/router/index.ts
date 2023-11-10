import {createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized} from 'vue-router'
import User from "@/pages/User.vue";
import UserComp from "@/components/admin/UserComp.vue";
import Admin from "@/pages/Admin.vue";
import Auth from "@/pages/Auth.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import Users from "@/components/admin/Users.vue";
import Settings from "@/components/Settings.vue";
import AdminMain from "@/components/admin/AdminMain.vue";
import Statistic from "@/components/admin/Statistic.vue";
import Tasks from "@/components/admin/Tasks.vue";

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
      beforeEnter: AdminGuard,
      children: [
        {
          path: '',
          name: 'adminMain',
          component: AdminMain,
        },
        {
          path: 'users',
          name: 'users',
          component: Users,
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
        },
        {
          path: 'users/:id',
          name: 'user',
          component: UserComp,
          children: [
            {
              path: '',
              name: 'statistic',
              component: Statistic
            },
            {
              path: '',
              name: 'tasks',
              component: Tasks
            }
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage
    },
  ]
})

export default router
