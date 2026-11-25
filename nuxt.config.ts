import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',

  // An internal admin tool behind a login has no SEO needs, so we render in the
  // browser only (SPA). See docs/03-nuxt.md → "Rendering modes".
  ssr: false,

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [{ name: 'theme-color', content: '#187c5c' }],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    // Server-only. Never sent to the browser.
    mockLatencyMs: 300,
    // Everything under `public` IS sent to the browser. Never put secrets here.
    public: {
      appName: 'Inventory Admin',
    },
  },

  typescript: {
    strict: true,
  },
})
