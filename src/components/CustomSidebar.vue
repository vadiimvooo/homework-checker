<script setup lang="ts">
  import type {PropType} from "vue";
  import {type MenuItem} from "primevue/menuitem";
  import {ref} from "vue";
  import type {IUser} from "@/models/User";
  import {supabaseClient} from "@/lib/supabaseClient";
  import router from "@/router";

  defineProps({
    isForSmallScreens: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object as PropType<IUser>,
      required: true
    },
    items: {
      type: Object as PropType<MenuItem[]>,
      required: true
    },
    additionalClasses: {
      type: String,
    }
  });
  const visible = ref(false);
  const onVisibleChange = () => {
    visible.value = !visible.value;
  }

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    await router.push("/auth");
  }
</script>

<template>
  <Menu
    v-if="!isForSmallScreens"
    class="overflow-scroll"
    :model="items"
    :pt="{
      root: {
        class: `w-[320px] h-[100vh] flex flex-col overflow-auto ${additionalClasses ? additionalClasses : ''}`
      },
      start: {
        class: 'flex-none'
      },
      menu: {
        class: 'grow'
      },
      end: {
        class: 'flex-none'
      },
      content: {
        class: 'transition-all'
      }
    }"
  >
    <template #start>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-1 px-2 py-2"
      >
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-2rem">
          <path
            d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
            fill="var(--primary-color)"
          />
          <path
            d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
            fill="var(--text-color)"
          />
        </svg>
        <span class="text-xl font-semibold">PRIME<span class="text-primary">APP</span></span>
      </RouterLink>
    </template>
    <template #submenuheader="{ item }">
      <span class="text-primary font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
      </a>
    </template>
    <template #end>
      <div class="flex items-center">
        <button
            v-ripple
            class="relative overflow-hidden w-full p-link flex items-center p-2 pl-3 text-color hover:surface-200 border-noround gap-3"
        >
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="block w-[32px] h-[32px]" shape="circle" />
          <div class="flex flex-col">
            <div class="font-bold text-xs md:text-base">{{user?.email?.split("@")[0]}}</div>
            <div class="text-sm">{{user.user_metadata.role ? "Admin" : "User"}}</div>
          </div>
        </button>
        <button
          class="p-3 pr-5"
          @click="signOut"
        >
          <i class="pi pi-sign-out"/>
        </button>
      </div>

    </template>
  </Menu>
  <Sidebar
      v-if="isForSmallScreens"
      v-model:visible="visible"
      class="w-full h-full"
  >
    <template #container="{ closeCallback }">
      <div class="h-full overflow-auto">
        <div class="flex items-center justify-between px-4 pt-3 flex-shrink-0">
          <span class="inline-flex items-center gap-2">
            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="" fill="var(--primary-color-color)" />
              <path d="" fill="var(--text-color)" />
            </svg>
            <span class="font-semibold text-2xl text-primary">Your Logo</span>
          </span>
          <span>
            <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-[2rem] w-[2rem]"></Button>
          </span>
        </div>
        <div class="max-w-[300px] ml-10">
          <ul class="list-none p-3 m-0">
            <li>
              <div
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterClass: 'hidden',
                  enterActiveClass: 'slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'slideup'
                }"
                class="p-3 flex items-center justify-between text-600 cursor-pointer p-ripple"
              >
                <span class="font-medium">DOCUMENTS</span>
                <i class="pi pi-chevron-down"></i>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <RouterLink
                    v-ripple class="flex items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    :to="{
                      name: 'users'
                    }"
                    @click="visible = false"
                  >
                    <i class="pi pi-home mr-2"></i>
                    <span class="font-medium">Users</span>
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="list-none p-3 m-0">
            <li>
              <div
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterClass: 'hidden',
                  enterActiveClass: 'slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'slideup'
                }"
                class="p-3 flex items-center justify-between text-600 cursor-pointer p-ripple"
              >
                <span class="font-medium">ACCOUNT</span>
                <i class="pi pi-chevron-down"></i>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <RouterLink
                      v-ripple
                      class="flex items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                      :to="{
                        name: 'settings'
                      }"
                      @click="visible = false"
                  >
                    <i class="pi pi-cog mr-2"></i>
                    <span class="font-medium">Settings</span>
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <hr class="mx-3 border-top-1 border-none surface-border" />
        <div class="mt-auto max-w-[300px] ml-10 flex justify-between">
          <RouterLink
            v-ripple
            class="m-3 flex items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
            :to="{
              name: 'settings'
            }"
            @click="visible = false"
          >
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold">{{ user?.email?.split("@")[0]}}</span>
          </RouterLink>
          <button
              class="pr-5"
              @click="signOut"
          >
            <i class="pi pi-sign-out"/>
          </button>
        </div>
      </div>
    </template>
  </Sidebar>
  <div
    v-if="isForSmallScreens"
    class="mx-10"
  >
    <Button
      icon="pi pi-bars"
      @click="onVisibleChange"
    />
  </div>
</template>

<style scoped>
</style>
