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
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  const chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        tension: 0.4
      },
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
</script>

<template>
  <Breadcrumb :home="home" :model="items">
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
  <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
</template>

<style scoped>
</style>
