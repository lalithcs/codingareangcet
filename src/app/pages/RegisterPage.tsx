import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Code } from 'lucide-react';

import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import { OtpInput } from '../components/OtpInput';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    setError(null);
    setLoading(true);

    try {
      /**
       * BACKEND:
       * POST /auth/register  (send OTP only)
       */
      // await fetch('/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      /* ================= MOCK ================= */
      await new Promise((r) => setTimeout(r, 800));
      setOtpSent(true);
      /* ======================================== */

    } catch {
      setError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP + REGISTER ================= */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      /**
       * BACKEND:
       * POST /auth/register  (verify OTP + create user)
       */
      // await fetch('/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   credentials: 'include',
      //   body: JSON.stringify({
      //     username,
      //     email,
      //     password,
      //     otp,
      //   }),
      // });

      /* ================= MOCK ================= */
      await new Promise((r) => setTimeout(r, 1000));
      /* ======================================== */

      // IMPORTANT: backend has set cookie → refresh user
      await refreshUser();

      navigate('/problems');
    } catch {
      setError('Registration failed');
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
          <h1 className="text-2xl">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Join CodeArena and start solving problems
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
              required
            />

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

            {!otpSent ? (
              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? 'Sending OTP…' : 'Send OTP'}
              </Button>
            ) : (
              <>
                <div className="pt-2">
                  <label className="text-sm mb-2 block text-center">
                    Enter OTP
                  </label>
                  <OtpInput value={otp} onChange={setOtp} />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </Button>
              </>
            )}

            {error && (
              <p className="text-sm text-destructive text-center">
                {error}
              </p>
            )}

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
