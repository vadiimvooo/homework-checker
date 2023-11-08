<script setup lang="ts">
  import {supabaseClient} from "@/lib/supabaseClient";
  import router from "@/router";

  const signOut = async () => {
      await supabaseClient.auth.signOut();
      await router.push("/auth");
}
</script>

<template>
  Admin comp
    <button
            type="button"
            @click="signOut"
    >
        Sign Out
    </button>
</template>

<style scoped>
</style>
