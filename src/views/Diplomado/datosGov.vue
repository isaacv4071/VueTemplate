<script setup lang="ts">
    import axios from 'axios';
    import DefaultLayout from '@/layouts/DefaultLayout.vue'

    const dataGov = axios.get('https://www.datos.gov.co/resource/r86y-229a.json').then(response => {
        console.log(response);
    });
</script>


<template>
    <DefaultLayout>
    </DefaultLayout>
</template>