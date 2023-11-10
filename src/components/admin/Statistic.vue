<script setup lang="ts">
  import ArrowYearPicker from "@/components/shared/ArrowYearPicker.vue";

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
    aspectRatio: 0.8,
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

  const onYearChange = (year: number) => {
    console.log(year);
  }
</script>

<template>
  <div class="p-10 md:p-20 flex flex-col">
    <ArrowYearPicker class="mx-auto mb-5" @year-changed="onYearChange($event)"/>
    <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
  </div>
</template>

<style scoped>
</style>
