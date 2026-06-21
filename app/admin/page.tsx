'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '@/services/api';
import type { AuthUser } from '@/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored) as AuthUser);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // on déconnecte côté client même si la requête échoue
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      toast.success('Déconnecté.');
      router.replace('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-bone">
      {/* Barre supérieure */}
      <header className="flex items-center justify-between border-b border-char/10 px-6 py-4">
        <span className="font-mono text-xs uppercase tracking-widest text-black">
          Administration · Jesuton SARL
        </span>
        <div className="flex items-center gap-4">
          {user && (
            <span className="flex items-center gap-2 text-sm text-char/60">
              <User className="h-4 w-4" />
              {user.name}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-char/15 px-4 py-2 text-sm text-char transition hover:bg-char hover:text-bone"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu */}
      <main className="container py-16 text-center">
        <h1 className="text-3xl font-bold text-char">
          Bonjour{user ? `, ${user.name}` : ''} 👋
        </h1>
        <p className="mt-3 text-char/50">
          Vous êtes connecté au panneau d&apos;administration.
        </p>
      </main>
    </div>
  );
}
