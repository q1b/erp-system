import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private"
import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"

export const { handle, signIn, signOut } = SvelteKitAuth(async () => ({
    providers: [
        Google({
            clientId: AUTH_GOOGLE_ID,
            clientSecret: AUTH_GOOGLE_SECRET
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        // signIn({ profile }) {
        //     if(!profile) return false
        //     if(!profile.email) return false
        //     return profile.email.endsWith("@srisriuniversity.edu.in")
        // },
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