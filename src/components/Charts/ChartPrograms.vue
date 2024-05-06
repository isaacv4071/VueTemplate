<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"
  >
    <div class="mb-4 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">Programas</h4>
      </div>
    </div>

    <div>
      <div id="chartTwo" class="-ml-5 -mb-9">
        <VueApexCharts
          type="bar"
          height="335"
          :options="computedApexOptions"
          :series="chartData.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
});

const chartData = ref(props.chartData)

const computedApexOptions = computed(() => {
  const options = {
    colors: ['#3056D3', '#80CAEE'],
    chart: {
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%'
            }
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '60%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'category',
      categories: Object.values(chartData.value.labels)
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '16px',

      markers: {
        radius: 99
      }
    },
    fill: {
      opacity: 1
    }
  };

  return options;
})
</script>
