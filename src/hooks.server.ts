import { redirect, type Handle } from "@sveltejs/kit";
import { building } from "$app/environment";
import { getFirebaseServer } from "$lib/server/firebase.server";
import type { DecodedIdToken } from "firebase-admin/auth";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.id = "";
    event.locals.email = "";

    const isAuth: boolean = event.url.pathname === "/auth";
    const isHome: boolean = event.url.pathname === "/"; // Check if the current route is the home page
    const protectedRoutes = ['/Profile', '/MyFamily', '/Address']; // Define protected routes
    const isProtectedRoute = protectedRoutes.includes(event.url.pathname);
    // Allow unauthenticated access to the home page
    if (isAuth || building || isHome) {
        return await resolve(event);
    }

    const session = event.cookies.get("session") ?? "";
    console.log("Session cookie retrieved:", session);
    const admin = getFirebaseServer();
    if (admin.error) {
        throw redirect(303, "/auth");
    }
    let decodedClaims: DecodedIdToken;
    try {
        decodedClaims = await admin.data.auth().verifySessionCookie(session, false);
    } catch (error) {
        console.error(error);
        throw redirect(303, "/auth");
    }
    const { uid, email } = decodedClaims;
    event.locals.id = uid;
    event.locals.email = email ?? "";

    if (isProtectedRoute && !event.locals.id) {
        throw redirect(303, "/auth");
    }

    return await resolve(event);
};
