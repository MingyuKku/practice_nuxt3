import { widget } from '@/public/charting_library';

const Widget = widget;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('TVChart', Widget)
})