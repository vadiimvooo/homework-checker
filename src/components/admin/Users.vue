<script setup lang="ts">
import {onMounted, ref} from "vue";
  import type {IUser} from "@/models/User";
import {getUsers} from "@/api/user";
import router from "@/router";
import {MenuItem} from "primevue/menuitem";
import type {DataTableRowClickEvent} from "primevue/datatable";
import moment from "moment";

  const users = ref<IUser[]>([]);
  const items = ref<MenuItem[]>([
    { label: 'Users', route: '/admin/users' },
  ]);
  const home = ref({
    icon: 'pi pi-home',
    route: '/'
  });

  const products = ref();
  const columns = [
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'created', header: 'Created' },
    { field: 'lastSignIn', header: 'Last Sign In' }
  ];

  onMounted(async () => {
    await fetchUsers();
    products.value = users.value.map((user) => {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone ? user.phone : "-",
        created: moment(user.created_at).format("DD MMM YYYY"),
        lastSignIn: moment(user.last_sign_in_at).fromNow()
      }
    });
  })

  const fetchUsers = async () => {
    users.value = ((await getUsers()) as unknown as IUser[])
        .filter((user) => !user.user_metadata.role);
  }

  const goToUser = (event: DataTableRowClickEvent) => {
    const user: IUser = event.data;

    console.log(user);

    router.push({
      name: 'statistic',
      params: {
        id: user.id
      },
    })
  }
</script>

<template>
  <Breadcrumb :home="home" :model="items" class="h-[56px]">
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
  <DataTable
      :value="products"
      resizableColumns
      columnResizeMode="fit"
      showGridlines
      :row-hover="true"
      :pt="{
        bodyRow: {
          class: 'transition-all',
        }
      }"
      @row-click="goToUser($event)"
  >
    <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        class="transition-all"
    >
    </Column>
  </DataTable>
</template>

<style scoped>
</style>
