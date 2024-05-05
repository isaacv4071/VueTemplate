<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import { apiUrl } from '@/config/apiConfig.js' //Importa la URL de la API

// Refs para almacenar los datosammm
const listado = ref([])
const periodos = ref([])
const facultades = ref([])
const programas = ref([])

const filters = ref({
  programa: '',
  periodo: '',
  facultad: '',
})

//Realizar la solicitud HTTP y manejar la respuesta
const fetchDta = () => {
  axios
    .get(apiUrl)
    .then(function (response) {
      // manejar respuesta exitosa

      //Se almacennan datos de la  API
      listado.value = response.data

      //Se obtienen períodos unicos
      const periodosUnicos = [...new Set(response.data.map((item) => item.periodo))]
      periodos.value = periodosUnicos
      //console.log('Periodos unicos:', periodosUnicos);

      //Se obtienen facultades únicas
      const facultadesUnicas = [...new Set(response.data.map((item) => item.facultad))]
      facultades.value = facultadesUnicas

      //Se obtienen programas únicos
      const programasUnicos = [...new Set(response.data.map((item) => item.programa))]
      programas.value = programasUnicos
    })
    .catch(function (error) {
      // manejar error
      console.log(error)
    })
    .finally(function () {
      // siempre sera executado
    })
}

function filtrado() {
  let concat = false;
  if (filters.value.facultad === '' && filters.value.periodo === '' && filters.value.programa === '') {
    fetchDta()
    return;
  }
  let queryParam = "?"
  if (filters.value.periodo !== '') {
    concat = true
    queryParam += `periodo=${filters.value.periodo}`
  }
  if (filters.value.facultad !== '') {
    queryParam += (concat) ? `&facultad=${filters.value.facultad}` : `facultad=${filters.value.facultad}`
    concat = true;
  }
  if (filters.value.programa !== '') {
    queryParam += (concat) ? `&programa=${filters.value.programa}` : `programa=${filters.value.programa}`
    concat = true;
  }

  axios.get(`${apiUrl}/${queryParam}`).then((response) => {
    listado.value = response.data
  })
}

//Se ejecuta el fetchData cuando se monta el componente
onMounted(fetchDta)
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
            class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="filters.periodo"
          >
            <option selected value="">Período</option>
            <!-- Se itera sobre los periodos únicos y se muestran -->
            <option v-for="periodo in periodos" :value="periodo">{{ periodo }}</option>
          </select>
        </form>
      </div>
      <!-- Select para elegir facultad -->
      <div class="flex-1">
        <form class="max-w-sm mx-auto">
          <label for="facultad" class="mb-3 block text-sm font-medium text-black dark:text-white"
            >Selecione Facultad</label
          >
          <select
            id="facultad"
            class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="filters.facultad"
          >
            <option selected value="">Facultad</option>
            <!-- Se itera sobre las facultades únicas y se muestran -->
            <option v-for="facultad in facultades" :value="facultad">{{ facultad }}</option>
          </select>
        </form>
      </div>
      <!-- Select para elegir programa -->
      <div class="flex-1">
        <form class="max-w-sm mx-auto">
          <label for="programa" class="mb-3 block text-sm font-medium text-black dark:text-white"
            >Seleccione Programa</label
          >
          <select
            id="programa"
            class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="filters.programa"
          >
            <option selected value="">Programa</option>
            <!-- Se itera sobre los programas únicos y se muestran -->
            <option v-for="programa in programas" :value="programa">{{ programa }}</option>
          </select>
        </form>
      </div>
      <div class="flex items-center">

        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80 mt-8"
          @click="filtrado"
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Tabla para mostrar resultados -->
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
