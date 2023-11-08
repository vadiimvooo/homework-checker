<script setup lang="ts">
    import {supabaseClient} from "@/lib/supabaseClient";
    import {ThemeSupa} from "@supabase/auth-ui-shared";
    import {Auth} from '@nuxtbase/auth-ui-vue'
    import router from "@/router";
    import {useRoute} from "vue-router";

    const emit = defineEmits(['signOut']);
    const route = useRoute();
    const user = route.params.data;

    const signOut = () => {
        emit('signOut');
    }

    supabaseClient.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") {
            router.push('/auth');
            return;
        }

        if (event === "SIGNED_IN") {
            router.push('/home');
            return;
        }
    })
</script>

<template>
    <div class="mx-auto my-10 px-5 max-w-[400px] md:my-20">
        <Auth
            :supabaseClient="supabaseClient"
            :appearance="{
                theme: ThemeSupa
            }"
            :providers="['google', 'facebook', 'twitter']"
        />
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
