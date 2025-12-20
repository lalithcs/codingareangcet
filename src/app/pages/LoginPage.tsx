import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Code } from 'lucide-react';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      /**
       * BACKEND: POST /auth/login
       * credentials: 'include'
       */
      // await fetch('/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   credentials: 'include',
      //   body: JSON.stringify({ email, password }),
      // });

      /* ================= MOCK ================= */
      await new Promise((r) => setTimeout(r, 800));
      /* ======================================== */

      // IMPORTANT: refresh user from backend
      await refreshUser();

      navigate('/problems');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 pt-20">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar showWhenUnauthenticated publicView />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Code className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to CodeArena
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Login'}
            </Button>

            {error && (
              <p className="text-sm text-destructive text-center">
                {error}
              </p>
            )}

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-primary hover:underline">
                Create account
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
