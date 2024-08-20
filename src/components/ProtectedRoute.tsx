'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/src/components/AuthProvider';
import Spinner from '../ui/Spinner';

const privateRoutes = ['/profile', '/favorites', '/logout'];
const publicRoutes = ['/login', '/register'];

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(status === 'loading');

  const isUserLoggedIn = !!session?.user || isLoggedIn;
  const isPrivateRoute = privateRoutes.includes(pathName);
  const isPublicRoute = publicRoutes.includes(pathName);
  console.log('session', session);
  console.log('isUserLoggedIn', isUserLoggedIn);
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
    (status === 'authenticated' && !isPublicRoute) ||
    (status === 'unauthenticated' && !isPrivateRoute)
  ) {
    return <>{children}</>;
  }

  return null;
}

export default ProtectedRoute;
