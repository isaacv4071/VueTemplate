<script setup>
import TablaList from '@/components/Tables/TablaList.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import FilterTable from '@/components/Filters/FilterTable.vue'
import { ref} from 'vue'

const pageTitle = ref('Lista de datos')
const listado = ref([]);

function actualizarListado(datos) {
    listado.value = datos;
}

</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->
    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <!-- ====== Table One Start -->
      <div class="col-span-12">
        <FilterTable @datosActualizados="actualizarListado"/>
        <TablaList :listado="listado" />
      </div>
      <!-- ====== Table One End -->
    </div>
  </DefaultLayout>
</template>