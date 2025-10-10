// Import authentication providers from NextAuth for handling different login methods
import CredentialsProvider from "next-auth/providers/credentials"; // Email/password authentication
import GoogleProvider from "next-auth/providers/google"; // Google authentication

// Importing the User model to interact with the database
import User from "@/model/user";

// Import bcrypt for password hashing and verification
import bcrypt from "bcrypt";

// Import database connection utility
import dbConnect from "@/utils/dbConnect";

// Define authentication options for NextAuth
export const authOptions = {
  // Define session strategy to use JWT (JSON Web Token) instead of database sessions
  session: {
    strategy: "jwt",
  },

  // Configure authentication providers
  providers: [
    // Email/phone and password authentication
    CredentialsProvider({
      async authorize(credentials, req) {
        // Connect to the database before querying user data
        await dbConnect();

        // Extract email, phone, and password from credentials
        const { email, phone, password } = credentials;

        // Validate that we have either email or phone
        if (!email && !phone) {
          throw new Error("Email or phone number is required");
        }

        // Find user by email OR mobileNumber in the database
        const user = await User.findOne({
          $or: [
            { email: email || "" },  // Search by email if provided
            { mobileNumber: phone || "" }   // Search by phone if provided
          ]
        });

        // If user exists but has no password (e.g., registered via Google), deny login
        if (!user?.password) {
          throw new Error("Please login via the method used to sign up");
        }

        // Compare entered password with hashed password stored in the database
        const isPasswordValid = user && (await bcrypt.compare(password, user.password));

        // If password is incorrect, throw an error
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // Return user data if authentication is successful
        return user;
        // return {
        //   id: user._id.toString(),
        //   email: user.email,
        //   name: user.name,
        //   image: user.image,
        //   role: user.role || "user",
        // };
      },
    }),

    // Google authentication provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google Client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret
    }),

  ],

  // Define custom callback functions for NextAuth
  callbacks: {
    // Callback when a user signs in
    async signIn({ user, account }) {
      // Connect to the database
      await dbConnect();

      // Extract email and phone from the authenticated user
      const { email, phone } = user;

      // Try to find an existing user with the provided email or mobileNumber
      let dbUser = await User.findOne({
        $or: [
          { email: email || "" },
          { mobileNumber: phone || "" }
        ]
      });

      // If the user does not exist in the database and is signing in via OAuth, create a new user record
      if (!dbUser && (account?.provider === 'google' )) {
        dbUser = await User.create({
          email,
          name: user?.name, // Store the user's name
          image: user?.image, // Store the user's profile image
        });
      }

      return true; // Allow login
    },



    async redirect({ url, baseUrl }) {
      // Redirect to home page after successful login
      return `${baseUrl}/`;
    },

    // Callback to modify JWT token before it's sent to the client
    jwt: async ({ token, user }) => {
      // Find user by email or mobileNumber in the database
      const dbUser = await User.findOne({
        $or: [
          { email: token.email || "" },
          { mobileNumber: token.phone || "" }
        ]
      });

      // If the user exists, remove the password field for security reasons
      if (dbUser) {
        dbUser.password = undefined; // Exclude sensitive fields

        // Add user data and role to the token object
        token.user = {
          ...dbUser.toObject(),
          role: dbUser.role || "user", // Assign a default role if none exists
        };
      }

      return token; // Return updated token
    },

    // Callback to modify the session object before it's sent to the client
    session: async ({ session, token }) => {
      // Attach user details (including role) from the token to the session object
      session.user = {
        ...token.user,
        role: token.user.role || "user", // Ensure role is always included
      };

      return session; // Return updated session
    },
  },

  // Secret key for securing authentication tokens
  secret: process.env.NEXTAUTH_SECRET,

  // Define custom pages for authentication (e.g., custom login page)
  pages: {
    signIn: "/login", // Redirect users to the login page
  },
};





























// // utils/authOptions.js

// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// import User from "@/model/user";
// import bcrypt from "bcrypt";
// import dbConnect from "@/utils/dbConnect";

// export const authOptions = {
//   debug: true, // Bật debug log cho dễ trace khi lỗi

//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     // 🔹 Đăng nhập bằng Email/Phone + Password
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         phone: { label: "Phone", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("DEBUG credentials:", credentials);
//         await dbConnect();

//         const { email, phone, password } = credentials || {};

//         if (!email && !phone) {
//           throw new Error("Email or phone number is required");
//         }

//         // Tìm user bằng email hoặc phone
//         const user = await User.findOne({
//           $or: [{ email: email || "" }, { phone: phone || "" }],
//         });

//         if (!user?.password) {
//           throw new Error("Please login via the method used to sign up");
//         }

//         const isPasswordValid =
//           user && (await bcrypt.compare(password, user.password));

//         if (!isPasswordValid) {
//           throw new Error("Invalid credentials");
//         }

//         // Trả về object thuần JSON (NextAuth yêu cầu)
//         return {
//           id: user._id.toString(),
//           email: user.email,
//           phone: user.phone,
//           name: user.name,
//           image: user.image || null,
//           role: user.role || "user",
//         };
//       },
//     }),

//     // 🔹 Đăng nhập bằng Google
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   callbacks: {
//     // ✅ Xử lý khi user login
//     async signIn({ user, account }) {
//       await dbConnect();

//       // Với Google login → check & tạo user nếu chưa có
//       if (account?.provider === "google") {
//         let dbUser = await User.findOne({ email: user.email });

//         if (!dbUser) {
//           dbUser = await User.create({
//             email: user.email,
//             name: user.name,
//             image: user.image,
//             role: "user",
//           });
//         }
//       }

//       return true;
//     },

//     // ✅ Custom JWT
//     async jwt({ token, user }) {
//       await dbConnect();

//       // Nếu vừa login (credentials/google) → merge thông tin user vào token
//       if (user) {
//         token.user = {
//           id: user.id,
//           email: user.email,
//           phone: user.phone,
//           name: user.name,
//           image: user.image,
//           role: user.role || "user",
//         };
//       }

//       // Nếu chưa có user trong token → lấy từ DB (trường hợp refresh)
//       if (!token.user?.id && token.email) {
//         const dbUser = await User.findOne({ email: token.email });
//         if (dbUser) {
//           token.user = {
//             id: dbUser._id.toString(),
//             email: dbUser.email,
//             phone: dbUser.phone,
//             name: dbUser.name,
//             image: dbUser.image,
//             role: dbUser.role || "user",
//           };
//         }
//       }

//       return token;
//     },

//     // ✅ Custom Session
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },

//     // ✅ Redirect sau khi login
//     async redirect({ baseUrl }) {
//       return `${baseUrl}/`;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   pages: {
//     signIn: "/login", // custom login page
//   },
// };
