<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {useRoute} from "vue-router";
  import type {IUser} from "@/models/User";
  import {getUser} from "@/api/user";
  import {MenuItem} from "primevue/menuitem";

  const home = ref({
    icon: 'pi pi-home',
    route: '/'
  });

  const route = useRoute();
  const user = ref<IUser | null>(null);
  const active = ref(0);

  onMounted(() => {
    fetchUser();
  })

  const fetchUser = async () => {
    user.value = await getUser(route.params.id);
    items.value.push(
        { label: `${user.value?.email?.split("@")[0]}` }
    );
  }

  const items = ref<MenuItem[]>([
    { label: 'Users', route: '/admin/users' },
  ]);
  const tabMenuItems = ref<MenuItem[]>([
    {
      label: 'Statistic',
      icon: 'pi pi-chart-line',
      to: {
        name: 'statistic'
      }
    },
    {
      label: 'Tasks',
      icon: 'pi pi-book',
      to: {
        name: 'tasks'
      }
    },
  ]);
</script>

<template>
  <Breadcrumb
      :home="home"
      :model="items"
      class="h-[56px]"
  >
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="[item.icon, 'text-color']" />
          <span class="text-primary font-semibold">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span class="text-color">{{ item.label }}</span>
      </a>
    </template>
  </Breadcrumb>
  <TabMenu
      :model="tabMenuItems"
      :pt="{
        menuitem: {
          class: 'flex-auto',
        },
      }"
      v-model:activeIndex="active"
  />

  <router-view></router-view>
</template>

<style scoped>
  :deep(.p-menuitem-link) {
    justify-content: center !important;
  }
</style>
