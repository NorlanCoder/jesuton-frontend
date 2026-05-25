'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { AuthUser } from '@/types';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const isLoginPage = pathname === '/admin/login';

    if (!token && !isLoginPage) {
      router.replace('/admin/login');
    } else if (token && isLoginPage) {
      router.replace('/admin');
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bone">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-char/20 border-t-char" />
      </div>
    );
  }

  return <>{children}</>;
}
