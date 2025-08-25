import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Add your public routes
  publicRoutes: ["/", "/api/webhook/clerk"],
  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
