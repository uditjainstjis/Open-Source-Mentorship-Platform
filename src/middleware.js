import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // THESE ROUTES ARE ACCESSIBLE TO THE PUBLIC, BUT THE MIDDLEWARE STILL RUNS
  // AND INJECTS THE AUTH CONTEXT IF A TOKEN IS PRESENT.
  publicRoutes: [
    '/', // Root page is public
    '/api/user/status', // CRITICAL: Must be public for the client-side check to work
    '/api/user/onboarding', // Must be public for form submission
    '/api/mentors/explore',
    '/api/search/ai',
    '/sign-in(.*)', 
    '/sign-up(.*)', 
  ],
  // Ignore static files, internal Next.js paths, etc.
  ignoredRoutes: ['/favicon.ico', '/_next/static'],
});

export const config = {
  // Apply middleware to almost everything to ensure coverage
  matcher: ['/((?!_next|[^/]*\\..*).*)', '/(api|trpc)(.*)'],
};