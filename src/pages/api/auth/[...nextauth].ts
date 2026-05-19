// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",

//       credentials: {
//         identifier: {
//           label: "Identifier",
//           type: "text",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },

//       async authorize(credentials) {
//         try {
//           // STEP 1 LOGIN
//           const loginResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 identifier: credentials?.identifier,
//                 password: credentials?.password,
//               }),
//             }
//           );

//           const loginResult = await loginResponse.json();

//           if (!loginResponse.ok) {
//             throw new Error(loginResult?.message || "Login gagal");
//           }

//           // access token dari backend
//           const accessToken = loginResult?.data?.accessToken;

//           // STEP 2 GET USER BY TOKEN
//           const userResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );

//           const userResult = await userResponse.json();

//           if (!userResponse.ok) {
//             throw new Error(userResult?.message || "Get user gagal");
//           }

//           const user = userResult?.data;

//           // RETURN USER KE JWT NEXTAUTH
//           return {
//             ...user,
//             accessToken,
//           };
//         } catch (error: any) {
//           throw new Error(error.message);
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }) {
//       // saat login pertama
//       if (user) {
//         token.user = user;
//         token.accessToken = user.accessToken;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       session.user = token.user as any;
//       session.accessToken = token.accessToken as string;

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//   },
// };

// export default NextAuth(authOptions);



import AuthService from "@/services/auth.service";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials'

export interface UserExtended extends User {
    role?: string;
    accessToken?: string;
}

export interface JwtExtended extends JWT {
    user?: UserExtended;
}

export interface sessionExtened extends Session {
    accessToken?: string;
}


export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60*60
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: {label: "identifier", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials: Record<"identifier" | "password", string> | undefined) : Promise<UserExtended | null> {
                const {identifier, password} = credentials as {identifier: string; password: string;}

                const result = await AuthService.login({
                    identifier: identifier,
                    password: password
                });

                const accessToken = result.data.data;
                
                const me = await AuthService.getMeByToken(accessToken);
                const user = me.data.data;

                if(accessToken && result.status === 200 && user._id && me.status === 200) {
                    user.accessToken = accessToken;
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user} : {token: JwtExtended; user: UserExtended | null;}) {
            if(user) {
                token.user = user;
            }

            return token;
        },

        async session({session, token}: {session: sessionExtened; token: JwtExtended;}) {
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            return session;
        }
    }
})