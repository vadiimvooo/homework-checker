<script setup lang="ts">
  import {yearsGenerator} from "@/helpers/yearsGenerator";
  import {onMounted, ref, watch} from "vue";
  const years = yearsGenerator();

  const selectedYear = ref(years[years.length - 1]);
  const isLeftArrowDisabled = ref(selectedYear.value <= 0);
  const isRightRightArrowDisabled = ref(selectedYear.value >= years[years.length - 1]);

  const emit = defineEmits(['yearChanged'])

  const increase = () => {
    selectedYear.value++;
    isRightRightArrowDisabled.value = selectedYear.value >= years[years.length - 1];
    isLeftArrowDisabled.value = selectedYear.value <= 0;
  }
  const decrease = () => {
    selectedYear.value--;
    isRightRightArrowDisabled.value = selectedYear.value >= years[years.length - 1];
    isLeftArrowDisabled.value = selectedYear.value <= 0;
  }

  onMounted(() => {
    emit('yearChanged', selectedYear.value);
  });

  watch(selectedYear, (newYear) => {
    emit('yearChanged', newYear);
  })
</script>

<template>
  <div class="inline-flex gap-4 items-center p-3 border-2 border-[--primary-color] rounded-2xl">
    <button
        class="pi pi-arrow-left text-textPrimary disabled:text-gray-400 transition-all"
        @click="decrease"
        :disabled="isLeftArrowDisabled"
    />
    <div class="text-2xl text-textPrimary transition-all">{{selectedYear}}</div>
    <button
        class="pi pi-arrow-right text-textPrimary disabled:text-gray-400 transition-all"
        @click="increase"
        :disabled="isRightRightArrowDisabled"
    />
  </div>
</template>

<style scoped>
</style>
