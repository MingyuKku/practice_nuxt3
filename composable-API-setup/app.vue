<template>
  <div>
    <h1 v-if="isLocale('ko')"></h1>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { i18nMethods } from '~/locales/_methods'

const { isLocale } = i18nMethods();

</script>