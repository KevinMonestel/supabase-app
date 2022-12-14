import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.globals.css'],

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@formkit/nuxt'],

  formkit: {
    configFile: './formkit.config.ts',
  },
})
