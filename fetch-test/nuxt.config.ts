// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@nuxt/image-edge',
    'nuxt-swiper',
  ],
  plugins: [
    { src: '~/plugins/chart.ts', ssr: false },
  ]
})
