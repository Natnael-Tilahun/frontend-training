import type { Permission } from '#shared/types/auth'

// Teach TypeScript about our custom page meta:
// definePageMeta({ permission: PERMISSIONS.productCreate })
declare module '#app' {
  interface PageMeta {
    /** Pages that need a permission. Checked by middleware/auth.global.ts */
    permission?: Permission
    /** Pages that are reachable without signing in. */
    public?: boolean
  }
}

export {}
