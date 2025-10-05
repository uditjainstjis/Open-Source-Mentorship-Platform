import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // Only truly public routes that don't need authentication
  publicRoutes: [
    '/',
    '/sign-in(.*)', 
    '/sign-up(.*)', 
  ],
});
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};