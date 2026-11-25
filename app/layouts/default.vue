<script setup lang="ts">
import { LogOut, Menu, Package, X } from 'lucide-vue-next'

const auth = useAuthStore()
const route = useRoute()

const navigation = [{ label: 'Products', to: '/products', icon: Package }]

// The mobile menu closes on navigation and with the Escape key.
const menuOpen = ref(false)
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)
function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
}
onMounted(() => window.addEventListener('keydown', closeOnEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', closeOnEscape))

const accessLabel = computed(() => (auth.can('product.create') ? 'Full access' : 'Read only'))

async function logout() {
  auth.logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen lg:flex">
    <!-- Mobile top bar -->
    <header
      class="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden"
    >
      <NuxtLink
        to="/products"
        class="rounded-lg focus-visible:outline-2 focus-visible:outline-brand-500"
      >
        <UiLogo />
      </NuxtLink>
      <UiButton variant="ghost" size="icon" aria-label="Open menu" @click="menuOpen = true">
        <Menu />
      </UiButton>
    </header>

    <!-- Backdrop for the mobile menu -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        aria-hidden="true"
        @click="menuOpen = false"
      />
    </Transition>

    <!-- Sidebar: a drawer on mobile, always visible from lg up -->
    <aside
      :class="
        cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          menuOpen ? 'translate-x-0 shadow-pop' : '-translate-x-full',
        )
      "
    >
      <div class="flex h-16 items-center justify-between px-5">
        <NuxtLink
          to="/products"
          class="rounded-lg focus-visible:outline-2 focus-visible:outline-brand-500"
        >
          <UiLogo />
        </NuxtLink>
        <UiButton
          variant="ghost"
          size="icon"
          class="lg:hidden"
          aria-label="Close menu"
          @click="menuOpen = false"
        >
          <X />
        </UiButton>
      </div>

      <nav class="flex flex-1 flex-col gap-1 px-3 py-2" aria-label="Main">
        <p class="px-3 pb-2 text-xs font-medium tracking-wide text-slate-400 uppercase">
          Catalogue
        </p>
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-500"
          active-class="bg-brand-50 text-brand-800 hover:bg-brand-50 hover:text-brand-800"
        >
          <component
            :is="item.icon"
            class="size-[18px] text-slate-400 group-[.router-link-active]:text-brand-600"
            aria-hidden="true"
          />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div v-if="auth.user" class="flex items-center gap-3 border-t border-slate-200 p-4">
        <UiAvatar :name="auth.user.name" class="size-9" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-ink">{{ auth.user.name }}</p>
          <p class="truncate text-xs text-slate-500">{{ accessLabel }}</p>
        </div>
        <UiButton
          variant="ghost"
          size="icon"
          aria-label="Sign out"
          title="Sign out"
          @click="logout"
        >
          <LogOut />
        </UiButton>
      </div>
    </aside>

    <main class="min-w-0 flex-1">
      <div class="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <slot />
      </div>
    </main>
  </div>
</template>
