<script setup lang="ts">
  import { supabaseClient } from './lib/supabaseClient'
  import {useSupabaseUser} from '@nuxtbase/auth-ui-vue'
  import {ref, watch} from "vue";
  const user = ref(useSupabaseUser(supabaseClient).supabaseUser);

  watch(user, (user) => {
      console.log(user);
  })
</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>
