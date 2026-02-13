'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    if (formData.password.length < 8) {
      setError('La password deve essere di almeno 8 caratteri');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore durante la registrazione');
        return;
      }

      localStorage.setItem('token', data.token);
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      router.push('/');
    } catch {
      setError('Errore di connessione. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <Heart className="w-10 h-10 text-primary fill-primary mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-foreground">Crea il tuo Account</h1>
          <p className="text-muted-foreground mt-1">Inizia a creare il sito del tuo matrimonio</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8">
          {error && (
            <div className="bg-error/10 text-error text-sm p-3 rounded-xl mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome</label>
                <input
                  type="text" required placeholder="Nome"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.firstName}
                  onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Cognome</label>
                <input
                  type="text" required placeholder="Cognome"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.lastName}
                  onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email" required placeholder="la-tua@email.it"
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.email}
                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <input
                type="password" required placeholder="Min. 8 caratteri"
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.password}
                onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Conferma Password</label>
              <input
                type="password" required placeholder="Ripeti la password"
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.confirmPassword}
                onChange={e => setFormData(f => ({ ...f, confirmPassword: e.target.value }))}
              />
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <UserPlus className="w-4 h-4" />
              {isLoading ? 'Registrazione...' : 'Registrati'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Hai già un account?{' '}
              <Link href="/auth/login" className="text-primary font-medium hover:text-primary-dark">
                Accedi
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
