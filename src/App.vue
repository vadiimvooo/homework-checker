<script setup lang="ts">
  import { supabaseClient } from './lib/supabaseClient'
  import {useSupabaseUser} from '@nuxtbase/auth-ui-vue'
  import {onMounted, onUpdated, ref, watch} from "vue";
  const user = ref(useSupabaseUser(supabaseClient).supabaseUser);

  onMounted(() => {
      console.log(user.value);
  })

  onUpdated(() => {
      console.log(1);
  })

  watch(user, (user) => {
      console.log(user);
  })

  const signOut = async () => {
      await supabaseClient.auth.signOut();
      user.value = useSupabaseUser(supabaseClient).supabaseUser.value
  }

</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>
