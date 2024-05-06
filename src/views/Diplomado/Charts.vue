<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Table One Start -->
      <div class="col-span-12">
        <FilterTable @datosActualizados="actualizarListado"/>
        <!-- Paso de chartData como propiedad al componente hijo -->
        <ChartPrograms v-if="chartData.labels.length > 0" :chartData="chartData" />
      </div>
      <!-- ====== Table One End -->
    </div>
  </DefaultLayout>
</template>

<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import ChartPrograms from '@/components/Charts/ChartPrograms.vue'
import FilterTable from '@/components/Filters/FilterTable.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { ref, onMounted } from 'vue'

const pageTitle = ref('Graficas')
const chartData = ref({
  series: [
    {
      name: 'Sexo femenino',
      data: []
    },
    {
      name: 'Sexo masculino',
      data: []
    }
  ],
  labels: []
})

async function actualizarListado(datos) {
  try {
    //const response = await axios.get(apiUrl)
    const data = datos//response.data
    // Agrupar por programa y sumar sexo_masc y sexo_feme
    const groupedData = await data.reduce((acc, cur) => {
      if (!acc[cur.programa]) {
        acc[cur.programa] = {
          sexo_feme: 0,
          sexo_masc: 0
        };
      }
      acc[cur.programa].sexo_feme += parseInt(cur.sexo_feme);
      acc[cur.programa].sexo_masc += parseInt(cur.sexo_masc);
      return acc;
    }, {});

    // Convertir el objeto agrupado en una matriz para chartData
    chartData.value.labels = await Object.keys(groupedData).map(programa => programa);
    chartData.value.series[0].data = await Object.values(groupedData).map(item => item.sexo_feme);
    chartData.value.series[1].data = await Object.values(groupedData).map(item => item.sexo_masc);
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  
}
</script>
