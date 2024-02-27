// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            baseApiUrl: 'http://localhost:20002/'
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
    ]
})
  