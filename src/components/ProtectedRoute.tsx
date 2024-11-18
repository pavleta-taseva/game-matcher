'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/../context/AuthProvider';
import Spinner from '../ui/Spinner';

const privateRoutes = ['logout', 'user', 'favorites'];
const publicRoutes = ['/login', '/register'];

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { isLoggedIn, user } = useAuth();

  const router = useRouter();
  const pathName = usePathname();
  const path = pathName.split('/')[1];
  const [isRedirecting, setIsRedirecting] = useState(status === 'loading');

  const isUserLoggedIn = !!session?.user || isLoggedIn || user?.userId;
  const isPrivateRoute = privateRoutes.some(pathEl => pathEl === path);
  const isPublicRoute = publicRoutes.includes(pathName);

  const handleRedirect = () => {
    if (isUserLoggedIn && isPublicRoute) {
      router.replace('/');
    } else if (!isUserLoggedIn && isPrivateRoute) {
      router.replace('/login');
    }

    setIsRedirecting(false);
  };

  useEffect(() => {
    if (status === 'loading') return;

    handleRedirect();
  }, [status, pathName, isUserLoggedIn, router]);

  if (isRedirecting) {
    return <Spinner loading={true} />;
  }

  if (
    ((user?.userId || status === 'authenticated') && !isPublicRoute) ||
    ((!user?.userId || status === 'unauthenticated') && !isPrivateRoute)
  ) {
    return <>{children}</>;
  }

  return null;
}

export default ProtectedRoute;
