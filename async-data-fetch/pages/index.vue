<template>
    <div>
        <h1 class="text-[24px]">hello nuxt3</h1>
    </div>
</template>

<script setup lang="ts">
import { fetchSignList }  from '~/services/_fetch/sign'


const FETCH_KEY = 'sign-list';

const {
    data:signList,
    pending,
    error,
    refresh
} = await useAsyncData(FETCH_KEY, () => fetchSignList(FETCH_KEY))
console.log('응답', signList.value)

</script>