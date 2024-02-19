import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { getFirebaseServer} from "$lib/server/firebase.server";
import {checkUser} from "$lib/server/checkUser";

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const token = form.get("token");
        if (!token || typeof token !== "string") {
            throw redirect(303, "/auth");
        }
        const admin = getFirebaseServer();
        
      
        if (admin.error) {
            throw redirect(303, "/auth?error=adminError");
        }

        let decodedToken;
        try {
            decodedToken = await admin.data.auth().verifyIdToken(token);
        } catch (error) {
            console.error(error);
            throw redirect(303, "/auth?error=tokenVerificationFailed");
        }

        const { uid, email } = decodedToken;
        if (!email) {
            throw redirect(303, "/auth?error=emailMissing");
        }

        // Call your check function
        const isAllowedUser = await checkUser(uid, email);
        if (!isAllowedUser) {
            // If the user is not allowed, redirect them to an error page or login page with an error message
            throw redirect(303, "/auth?error=userNotAllowed");
        }

        // Expires in 5 days
        const expiresIn = 60 * 60 * 24 * 5;
        let sessionCookie: string;
        try {
            sessionCookie = await admin.data
                .auth()
                .createSessionCookie(token, { expiresIn: expiresIn * 1000 });
        } catch (error) {
            console.error(error);
            throw redirect(303, "/auth");
        }

        cookies.set("session", sessionCookie, {
            maxAge: expiresIn,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });

        throw redirect(303, "/");
    },

} satisfies Actions;


