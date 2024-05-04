<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import { apiUrl } from '@/config/apiConfig.js' //Importa la URL de la API

const listado = ref([])

onMounted(() => {
  axios
    .get(apiUrl)
    .then(function (response) {
      // manejar respuesta exitosa

      listado.value = response.data
      //console.log(response.data)
    })
    .catch(function (error) {
      // manejar error
      console.log(error)
    })
    .finally(function () {
      // siempre sera executado
    })
})
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Listado</h4>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Periodo</th>
            <th scope="col" class="px-6 py-3">Facultad</th>
            <th scope="col" class="px-6 py-3">Programa</th>
            <th scope="col" class="px-6 py-3">Total Matricula</th>
            <th scope="col" class="px-6 py-3">Masculino</th>
            <th scope="col" class="px-6 py-3">Femenino</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fila in listado" class="border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ fila.periodo }}
            </th>
            <td class="px-6 py-4">
              {{ fila.facultad }}
            </td>
            <td class="px-6 py-4">
              {{ fila.programa }}
            </td>
            <td class="px-6 py-4">
              {{ fila.total_matricula }}
            </td>
            <td class="px-6 py-4">
              {{ fila.sexo_masc }}
            </td>
            <td class="px-6 py-4">
              {{ fila.sexo_feme }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
