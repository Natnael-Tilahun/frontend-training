/**
 * Runs before every navigation (".global").
 * 1. Signed out → send to /login, remembering where they wanted to go.
 * 2. Signed in and visiting /login → send to the app.
 * 3. Page needs a permission the user lacks → send back to the product list.
 */
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (to.meta.public) {
    return auth.isAuthenticated && to.path === '/login' ? navigateTo('/products') : undefined
  }

  if (!auth.isAuthenticated) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }

  if (to.meta.permission && !auth.can(to.meta.permission)) {
    useToast().error('You do not have access to that page')
    return navigateTo('/products')
  }
})
