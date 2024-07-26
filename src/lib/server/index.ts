import { redirect, type RequestEvent } from "@sveltejs/kit";

/**
 * Validates that the user is authenticated.
 * @param {RequestEvent} event The location to redirect to.
 * @throws {Redirect} This error instructs SvelteKit to redirect to the Home Page
 */
export const validateUser = async (event:RequestEvent) => {
    const session = await event.locals.auth()
    if(!session) redirect(307, '/')
    return session.user
}