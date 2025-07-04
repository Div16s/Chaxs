import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";

export interface CustomSession {
    user: CustomUser;
    expires: ISODateString
}

export interface CustomUser {
    id?: string|null;
    name?: string|null;
    email?: string|null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
}

export const authOptions: AuthOptions = {
    pages: {
        signIn:"/"
    },
    callbacks: {
        async signIn({user, account}:{user: CustomUser, account: Account|null}) {
            try {
                console.log("User signed in:", user);
                console.log("Account details:", account);
                const payload = {
                    email: user.email,
                    name: user.name,
                    oauth_id: account?.providerAccountId,
                    provider: account?.provider,
                    image: user.image
                }
                
                const {data} = await axios.post(LOGIN_URL, payload);
                console.log("Response from login API:", data);
                user.id = data?.user?.id.toString();
                user.token = data?.user?.token || null;
                user.provider = data.user?.provider || null;
                return true;
            } catch (error) {
                console.error("Error during signIn callback:", error);
                return false; // Return false to prevent sign-in on error
                
            }
        },
        async session({ session, token }: { session: any; token: JWT }) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user || null;
            }
            return token;
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ]
}