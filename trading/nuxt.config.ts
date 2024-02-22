// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Charting Library nuxtjs Demo',
    htmlAttrs: {
      lang: 'en'
    },   
    script: [
      // {src: '/charting_library/datafeeds.js'}
      { src: '/datafeeds/udf/dist/bundle.js', }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
  },
  plugins: [
    // { src: '@/plugins/TVChart.js', mode: 'client' }
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || "http://localhost:20002",
      AUTH_API_URL: process.env.AUTH_API_URL || "http://localhost:21000"
    }
  },
})
