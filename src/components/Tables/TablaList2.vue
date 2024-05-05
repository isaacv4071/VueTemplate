<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { apiUrl } from '@/config/apiConfig.js'

const listado = ref([]);
const periodos = ref([]);
const sexoOptions = ref(['feme', 'masc', 'total_inscritos']);

onMounted(async () => {
  const response = await axios.get(apiUrl);
  const data = response.data;
  listado.value = data;
  periodos.value = [...new Set(data.map((item) => item.periodo))];
});

async function fetchDta(periodo, sexo) {
  const params = {
    periodo,
    sexo,
  };
  const response = await axios.get(apiUrl, { params });
  const data = response.data;
  listado.value = data;
}

function handlePeriodoChange(periodo) {
  fetchDta(periodo, sexoOptions.value);
}

function handleSexoChange(sexo) {
  fetchDta(periodo.value, sexo);
}

</script>

<template>
    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <h4 class="mb-2 text-xl font-semibold text-black dark:text-white">Filtro</h4>
  
      <div class="flex mb-4 space-x-3 dark:bg-form-input dark:border-strokedark p-5 border border-stroke rounded-sm">
        <!-- Select para elegir período -->
        <div class="flex-1">
          <form class="max-w-sm mx-auto">
            <label for="periodo" class="mb-3 block text-sm font-medium text-black dark:text-white"
              >Seleccione período</label
            >
            <select
              id="periodo"
              v-model="periodo"
              @change="handlePeriodoChange"
              class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>Período</option>
              <!-- Se itera sobre los periodos únicos y se muestran -->
              <option v-for="periodo in periodos" :value="periodo">{{ periodo }}</option>
            </select>
          </form>
        </div>
        <!-- Select para elegir sexo -->
        <div class="flex-1">
          <form class="max-w-sm mx-auto">
            <label for="sexo" class="mb-3 block text-sm font-medium text-black dark:text-white"
              >Seleccione sexo</label
            >
            <select
              id="sexo"
              v-model="sexo"
              @change="handleSexoChange"
              class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled selected>Sexo</option>
              <!-- Se itera sobre las opciones de sexo y se muestran -->
              <option v-for="sexo in sexoOptions" :value="sexo">{{ sexo }}</option>
            </select>
          </form>
        </div>
      </div>
  
      <!-- Chart -->
      <div class="flex justify-center">
        <canvas id="chart" width="400" height="200"></canvas>
      </div>
    </div>
  </template>