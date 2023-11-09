<script setup lang="ts">
  import { supabaseClient } from './lib/supabaseClient'
  import {useSupabaseUser} from '@nuxtbase/auth-ui-vue'
  import {onMounted, onUnmounted, ref, watch,} from "vue";
  import {useWindowStore} from "@/stores/window";
  const user = ref(useSupabaseUser(supabaseClient).supabaseUser);

  const { changeWindowWidth } = useWindowStore();

  const resizeCallback = () => {
    changeWindowWidth(window.outerWidth);
  }

  onMounted(() => {
    window.addEventListener("resize", resizeCallback);
  })

  onUnmounted(() => {
    window.removeEventListener("resize", resizeCallback);
  })

  watch(user, (user) => {
      console.log(user);
  })
</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>
