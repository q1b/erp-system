import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private"
import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "$lib/server/db"

export const { handle, signIn, signOut } = SvelteKitAuth(async () => ({
    adapter: DrizzleAdapter(db),
    providers: [
        Google({
            clientId: AUTH_GOOGLE_ID,
            clientSecret: AUTH_GOOGLE_SECRET
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            return session
        },
    },
    secret: AUTH_SECRET,
    trustHost: true,
}))