<script setup lang="ts">
const { public: config } = useRuntimeConfig()

useHead({ titleTemplate: (title) => (title ? `${title} · ${config.appName}` : config.appName) })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppToaster />
</template>
