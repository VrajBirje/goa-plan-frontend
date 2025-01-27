import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes, including `/`
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/", // Root route
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("Requested URL:", req.url); // Debug logging
  if (!isPublicRoute(req)) {
    await auth.protect(); // Protect non-public routes
  }
});

export const config = {
  matcher: [
    // Exclude Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
