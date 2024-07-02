/**
 * An array of routes that are accessible to the public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to the settings page.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]

/**
 * The prefix for API authentication routes.
 * The routes with this prefix will be used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default route to which users will be redirected on login.
 * @type {string}
 */

export const defaultLoginRedirect = "/settings"