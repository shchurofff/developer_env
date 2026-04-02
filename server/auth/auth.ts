import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "#server/db/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        await prisma.project.updateMany({
          where: { userId: anonymousUser.user.id },
          data: {
            userId: newUser.user.id,
          },
        });
      },
    }),
  ],
});
