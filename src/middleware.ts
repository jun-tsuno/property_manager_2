import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => {
      if (!token) {
        return false;
      }

      return true;
    },
  },
});

export const config = {
  matcher: '/dashboard/:path*',
};
