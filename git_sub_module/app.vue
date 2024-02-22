<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <ContentDoc />
  </div>
</template>


<script lang="ts" setup>
// console.log('테스트', useNuxtApp())

const res = await $fetch('/')
console.log('응답', res)
</script>