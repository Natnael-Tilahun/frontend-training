import { PERMISSIONS } from '#shared/types/auth'
import type { User } from '#shared/types/auth'

interface DemoUser extends User {
  password: string
}

/**
 * Two demo accounts so you can see permission-based UI in action:
 * - admin can do everything
 * - viewer can only read (and gets 403 from the API if they try to write)
 *
 * Plain-text passwords are acceptable ONLY because this is a local mock.
 */
export const demoUsers: DemoUser[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@inventory.test',
    password: 'admin123',
    permissions: Object.values(PERMISSIONS),
  },
  {
    id: 2,
    name: 'Read-only Viewer',
    email: 'viewer@inventory.test',
    password: 'viewer123',
    permissions: [PERMISSIONS.productRead],
  },
]
