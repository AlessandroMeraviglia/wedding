'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore durante il login');
        return;
      }

      // Store token
      localStorage.setItem('token', data.token);
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;

      // Redirect based on role
      if (data.user.role === 'ADMIN' || data.user.role === 'DESIGNER' || data.user.role === 'CUSTOMER_CARE') {
        router.push('/admin');
      } else {
        router.push('/');
      }
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
          <h1 className="text-2xl font-bold text-foreground">Accedi al tuo Account</h1>
          <p className="text-muted-foreground mt-1">Gestisci i tuoi ordini e il tuo sito</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8">
          {error && (
            <div className="bg-error/10 text-error text-sm p-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="la-tua@email.it"
                value={formData.email}
                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="La tua password"
                value={formData.password}
                onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? 'Accesso...' : 'Accedi'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Non hai un account?{' '}
              <Link href="/auth/register" className="text-primary font-medium hover:text-primary-dark">
                Registrati
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
