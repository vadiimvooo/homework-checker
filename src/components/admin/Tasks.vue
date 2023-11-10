<script setup lang="ts">
  import CreateTaskModal from "@/components/admin/CreateTaskModal.vue";
  import {onMounted, onUpdated, ref} from "vue";
  const isCreateModalOpened = ref(false);

  onMounted(() => {
    console.log(isCreateModalOpened.value);
  })

  onUpdated(() => {
    console.log(isCreateModalOpened.value);
  })
  const onTaskCreation = () => {
    isCreateModalOpened.value = true;
  }

  const onCLoseModal = () => {
    isCreateModalOpened.value = false;
  }
</script>

<template>
  <Button
      icon="pi pi-plus"
      severity="info"
      rounded
      aria-label="Search"
      class="w-[45px] h-[45px] absolute bottom-10 right-10"
      @click="onTaskCreation()"
      @close-modal="onCLoseModal"
  />
  <CreateTaskModal :visible="isCreateModalOpened" />
</template>

<style scoped>
</style>
