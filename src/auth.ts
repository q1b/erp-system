import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private"
import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "$lib/server/db"
import { eq } from "drizzle-orm"
import { userTable } from "./lib/server/db/schema"

declare module "@auth/sveltekit" {
    interface User {
        role: string
    }
    interface Session {
        user: {
            role: string
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"]
    }
}

export const { handle, signIn, signOut } = SvelteKitAuth(async () => ({
    adapter: DrizzleAdapter(db),
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
            clientId: AUTH_GOOGLE_ID,
            clientSecret: AUTH_GOOGLE_SECRET,
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        // This callback is called whenever a JSON Web Token is created
        async jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id
                token.role = user?.role || 'user'
            }
            if (user?.id) {
                const res = await db.query.userTable.findFirst({
                    where: eq(userTable.id, user.id)
                });
                token.role = res?.role
            }
            return token
        },
        // This callback is called whenever a session is checked. 
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            return session
        },
    },
    secret: AUTH_SECRET,
    trustHost: true,
}))