<script setup lang="ts">
  import {supabaseClient} from "@/lib/supabaseClient";
  import router from "@/router";
  import { type MenuItem } from "primevue/menuitem/MenuItem";
  import {ref, watch} from "vue";
  import {useSupabaseUser} from "@nuxtbase/auth-ui-vue";
  import {useWindowStore} from "@/stores/window";
  import {storeToRefs} from "pinia";
  import CustomSidebar from "@/components/CustomSidebar.vue";
  const user = useSupabaseUser(supabaseClient).supabaseUser;
  const windowStore = useWindowStore();
  const { windowWidth } = storeToRefs(windowStore);
  const isForSmallScreens = ref(window.outerWidth < 768);

  const items = ref<MenuItem[]>([
    {
      separator: true
    },
    {
      label: 'Documents',
      items: [
        {
          label: 'Users',
          icon: 'pi pi-user',
          command: async () => {
            await router.push({
              name: 'users'
            })
          }
        },
      ]
    },
    {
      label: 'Profile',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          command: async () => {
            await router.push({
              name: 'settings'
            })
          }
        },
      ]
    },
  ]);

  watch(windowWidth, (newWidth) => {
    if (newWidth < 768) {
      isForSmallScreens.value = true;
      return
    }
    isForSmallScreens.value = false;
  })
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <CustomSidebar
        v-if="user && items"
        :items="items"
        :user="user"
        :is-for-small-screens="isForSmallScreens"
        additionalClasses="flex-none sticky top-0"
    />
    <div class="flex-auto min-w-0">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
