<script setup lang="ts">
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { supabaseClient } from './lib/supabaseClient'
  import {Auth, useSupabaseUser} from '@nuxtbase/auth-ui-vue'
  import {onUpdated, ref} from "vue";
  const user = ref(useSupabaseUser(supabaseClient).supabaseUser);

  onUpdated(() => {
      console.log(user);
  })

  const signOut = async () => {
      await supabaseClient.auth.signOut();
      user.value = useSupabaseUser(supabaseClient).supabaseUser.value
  }

</script>

<template>
  <div class="mx-auto my-10 px-5 max-w-[400px] md:my-20">
      <Auth
        :supabaseClient="supabaseClient"
        :appearance="{
          theme: ThemeSupa
        }"
        :providers="['google', 'facebook', 'twitter']"
      ></Auth>
  </div>

  <button
      v-if="user"
      type="button"
      @click="signOut"
  >
      Sign Outkfdsmlksjfldksjflksdfjklds
  </button>
</template>

<style scoped>
</style>
