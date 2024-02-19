import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request, locals }) => {
    // Clear the session cookie by setting an expired date or deleting it
    locals.session.destroy();

    // Create a Response object for redirection
    return new Response(null, {
        status: 303,
        headers: {
            'Set-Cookie': 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict',
            'Location': '/auth'
        }
    });
};