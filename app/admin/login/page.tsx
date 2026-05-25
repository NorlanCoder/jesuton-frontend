'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '@/services/api';
import type { LoginPayload } from '@/types';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginPayload>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Si déjà connecté, rediriger vers le dashboard
  useEffect(() => {
    if (localStorage.getItem('admin_token')) {
      router.replace('/admin');
    }
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, user } = await authApi.login(form);
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user));
      toast.success(`Bienvenue, ${user.name} !`);
      router.replace('/admin');
    } catch (err) {
      const e = err as { message?: string };
      toast.error(e.message || 'Identifiants incorrects.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="w-full max-w-sm">
        {/* Logo / titre */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ember text-bone">
            <Sun className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-char">Administration</h1>
          <p className="mt-1 text-sm text-char/50">Jesuton SARL</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="admin@exemple.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="input"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-char px-6 py-4 text-sm font-medium text-bone transition hover:bg-char/80 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
