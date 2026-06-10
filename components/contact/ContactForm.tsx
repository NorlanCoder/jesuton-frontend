'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { contactApi } from '@/services/api';
import type { ContactPayload } from '@/types';

const initialState: ContactPayload = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const params = useSearchParams();
  const prefillProduct = params.get('produit');

  const [form, setForm] = useState<ContactPayload>({
    ...initialState,
    subject: prefillProduct ? `Demande de devis : ${prefillProduct}` : '',
    message: prefillProduct
      ? `Bonjour, je souhaiterais obtenir un devis pour : ${prefillProduct}.`
      : '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof ContactPayload>(
    key: K,
    value: ContactPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await contactApi.send(form);
      toast.success('Votre message a bien été envoyé. Nous vous recontactons sous 24h.');
      setForm(initialState);
    } catch (err) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      if (e.errors) setErrors(e.errors);
      toast.error(e.message || 'Impossible d’envoyer votre message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nom complet" required error={errors.name?.[0]}>
          <input
            type="text"
            className="input"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Votre nom complet"
            required
            minLength={2}
          />
        </Field>

        <Field label="Email" required error={errors.email?.[0]}>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="vous@exemple.com"
            required
          />
        </Field>
      </div>

      <Field label="Téléphone" error={errors.phone?.[0]}>
        <input
          type="tel"
          className="input"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="+229 01 00 00 00 00"
        />
      </Field>

      <Field label="Sujet" required error={errors.subject?.[0]}>
        <input
          type="text"
          className="input"
          value={form.subject}
          onChange={(e) => update('subject', e.target.value)}
          placeholder="Demande de devis pour..."
          required
          minLength={3}
        />
      </Field>

      <Field label="Message" required error={errors.message?.[0]}>
        <textarea
          className="input min-h-[160px] resize-y"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Décrivez votre projet en quelques lignes…"
          required
          minLength={10}
        />
      </Field>

      <div className="flex items-center justify-between border-t border-char/15 pt-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-black">
          Réponse sous 24h ouvrées
        </p>
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center gap-3 rounded-full bg-char px-6 py-4 text-sm font-medium text-bone transition-all duration-500 ease-editorial hover:bg-ember disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer le message
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bone text-char transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label">
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ember">
          {error}
        </p>
      )}
    </div>
  );
}
