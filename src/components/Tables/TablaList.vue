<script setup>
const props = defineProps({
  listado: Array // Define el tipo de la prop listado
});
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
        <tr v-for="fila in listado" :key="fila.id" class="border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ fila.periodo }}</td>
          <td class="px-6 py-4">{{ fila.facultad }}</td>
          <td class="px-6 py-4">{{ fila.programa }}</td>
          <td class="px-6 py-4">{{ fila.total_matricula }}</td>
          <td class="px-6 py-4">{{ fila.sexo_masc }}</td>
          <td class="px-6 py-4">{{ fila.sexo_feme }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
