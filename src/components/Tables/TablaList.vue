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
    <h4 class="mb-2 text-xl font-semibold text-black dark:text-white">Filtro</h4>

    <div class="flex mb-4 space-x-3">
      <div class="flex-1">
        <form class="max-w-sm mx-auto">
          <label
            for="countries"
            class="mb-3 block text-sm font-medium text-black dark:text-white"
            >Seleccione período</label
          >
          <select
            id="countries"
            class=" dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected>Período</option>
            <option value="US" >United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
      </div>
      <div class="flex-1">
        <form class="max-w-sm mx-auto">
          <label
            for="countries"
            class="mb-3 block text-sm font-medium text-black dark:text-white"
            >Selecione Facultad</label
          >
          <select
            id="countries"
            class=" dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected>Facultad</option>
            <option value="US" >United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
      </div>
      <div class="flex-1">
        <form class="max-w-sm mx-auto">
          <label
            for="countries"
            class="mb-3 block text-sm font-medium text-black dark:text-white"
            >Seleccione Programa</label
          >
          <select
            id="countries"
            class=" dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled selected>Programa</option>
            <option value="US" >United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
      </div>
      <div>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80 mt-8">Buscar</button>
      </div>
    </div>
    

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
