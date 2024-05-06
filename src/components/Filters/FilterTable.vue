<template>
    <div class="flex mb-4 space-x-3 dark:bg-form-input dark:border-strokedark p-5 border border-stroke rounded-sm">
        <!-- Select para elegir período -->
        <div class="flex-1">
            <form class="max-w-sm mx-auto">
                <label for="periodo" class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Seleccione período
                </label>
                <select id="periodo"
                    class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="filters.periodo">
                    <option selected value="">Período</option>
                    <!-- Se itera sobre los periodos únicos y se muestran -->
                    <option v-for="periodo in periodos" :value="periodo">{{ periodo }}</option>
                </select>
            </form>
        </div>
        <!-- Select para elegir facultad -->
        <div class="flex-1">
            <form class="max-w-sm mx-auto">
                <label for="facultad" class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Seleccione Facultad
                </label>
                <select id="facultad"
                    class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="filters.facultad">
                    <option selected value="">Facultad</option>
                    <!-- Se itera sobre las facultades únicas y se muestran -->
                    <option v-for="facultad in facultades" :value="facultad">{{ facultad }}</option>
                </select>
            </form>
        </div>
        <!-- Select para elegir programa -->
        <div class="flex-1">
            <form class="max-w-sm mx-auto">
                <label for="programa" class="mb-3 block text-sm font-medium text-black dark:text-white">
                    Seleccione Programa
                </label>
                <select id="programa"
                    class="dark:bg-form-input bg-gray-50 border border-stroke text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="filters.programa">
                    <option selected value="">Programa</option>
                    <!-- Se itera sobre los programas únicos y se muestran -->
                    <option v-for="programa in programas" :value="programa">{{ programa }}</option>
                </select>
            </form>
        </div>
        <div class="flex items-center">
            <button type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80 mt-8"
                @click="filtrado(); $event.target.blur()">
                Buscar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits  } from 'vue';
import axios from 'axios'
import { apiUrl } from '@/config/apiConfig.js' //Importa la URL de la API

const filters = ref({
    programa: '',
    periodo: '',
    facultad: '',
});

const periodos = ref([]);
const facultades = ref([]);
const programas = ref([]);
const listado = ref([]);

const emit = defineEmits(['datosActualizados']);

async function filtrado()  {
    const { periodo, facultad, programa } = filters.value;
    // Construir el queryParam
    const queryParams = new URLSearchParams();
    if (periodo) queryParams.append('periodo', periodo);
    if (facultad) queryParams.append('facultad', facultad);
    if (programa) queryParams.append('programa', programa);
    // Realizar la solicitud HTTP con los parámetros de búsqueda
    await axios.get(`${apiUrl}/?${queryParams}`).then((response) => {
        listado.value = response.data;
    });
    emit('datosActualizados', listado.value);
}
//Realizar la solicitud HTTP y manejar la respuesta
const fetchDta = () => {
    axios
        .get(apiUrl)
        .then(function (response) {
            // manejar respuesta exitosa

            //Se almacennan datos de la  API
            listado.value = response.data
            emit('datosActualizados', listado.value);

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

onMounted(fetchDta);
</script>