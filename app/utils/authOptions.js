import { jwtDecode } from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user.data.accessToken) {
          return user.data.accessToken;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If user is returned from authorize, add accessToken
      if (user) {
        const decodedToken = jwtDecode(user); // Decode the token here
        token.accessToken = user; // Store the access token

        // Add user information to the token
        token.id = decodedToken._id; // Extract ID
        token.name = decodedToken.name; // Extract name
        token.email = decodedToken.email; // Extract email
        token.role = decodedToken.role; // Extract role
      }

      return token; // Return the token
    },
    async session({ session, token }) {
      // Add user information to the session object
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id, // User ID
        name: token.name, // User name
        email: token.email, // User email
        role: token.role, // User role
      };

      return session; // Return the session
    },
  },
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};
