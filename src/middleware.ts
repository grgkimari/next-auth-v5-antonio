import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, defaultLoginRedirect, publicRoutes } from "./routes";

const {auth} = NextAuth(authConfig)
 
export default auth((req) => {
  // req.auth
  const {nextUrl} = req
  const isLoggedIn = !!req.auth
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isAPIAuthRoute) return 
  if(isAuthRoute){
    if(isLoggedIn) return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
        return 
  }
  if(!isLoggedIn && !isPublicRoute) return Response.redirect(new URL('/auth/login', nextUrl))
    return 
})
 
// Stop Middleware running on static files
export const config = {
    matcher: ["/((?!_next/image|_next/static|favicon.ico).*)", "/"],
  };