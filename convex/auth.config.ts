import { AuthConfig } from 'convex/server';

export default {
  providers: [
    {
      applicationID: 'convex',
      domain: process.env.CLERK_FRONTEND_API_URL!,
    },
  ],
} satisfies AuthConfig;
