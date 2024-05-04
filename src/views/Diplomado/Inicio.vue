<script setup>
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { ref } from 'vue'

const pageTitle = ref('Lista de datos')

</script>

<template>
  <DefaultLayout>
    <div class="grid text-center justify-content-center">
        <h1><strong>Página de Inicio de estudiantes</strong></h1>
        <div class="text-start">
            <h2>Integrantes</h2>
            <ul>
                <li>&MediumSpace; Agustín Hernández Serpa</li>
                <li>&MediumSpace; Isaac Damian Arrieta Mercado</li>
                <li>&MediumSpace; Geovani de Jesús Bracamonte Velasquez</li>
                <li>&MediumSpace; Duvan Antonio Cardenas Mendoza</li>
                <li>&MediumSpace; Andrea Carolina Barrios Montes</li>
            </ul>
        </div>
    </div>
    



    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

    </div>
  </DefaultLayout>
</template>