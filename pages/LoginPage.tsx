import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string; search?: string } })?.from;
  const redirectTarget = from ? `${from.pathname}${from.search || ''}` : '/bookings';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(redirectTarget, { replace: true });
    } else {
      setError(result.error || 'Failed to sign in. Please verify your details.');
    }
  };

  const handleQuickFill = () => {
    setEmail('aarav.sharma@example.in');
    setPassword('travel2026');
    setError(null);
  };

  return (
    <div className="max-w-[1120px] mx-auto px-5 py-12 flex items-center justify-center min-h-[calc(100vh-220px)]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#DCE5E4] p-8 shadow-xs">
        {/* Brand Kicker */}
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex justify-center focus-ring"
            aria-label="Flyvora Home"
          >
            <Logo size="sm" />
          </Link>
          <h1
            className="text-xl font-bold text-[#12263A] mt-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Sign in to your account
          </h1>
          <p className="text-xs text-[#5B6B7A] mt-1">
            Access your itineraries, booking status, and invoices
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-[10px] flex items-start gap-2.5 text-xs text-[#C0392B]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] pl-10 pr-3.5 py-2.5 focus-ring"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="text-xs font-semibold text-[#12263A]">
                Password
              </label>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] font-medium text-[#1B8A8F] hover:underline"
              >
                Autofill demo user
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] pl-10 pr-3.5 py-2.5 focus-ring"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-xs font-bold text-white bg-[#1B8A8F] hover:bg-[#157175] active:bg-[#0f5558] rounded-[10px] transition-colors focus-ring flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            <span>{loading ? 'Signing in...' : 'Sign in'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#DCE5E4] text-center text-xs text-[#5B6B7A]">
          Don't have a Wayfold account?{' '}
          <Link
            to="/signup"
            state={{ from }}
            className="font-bold text-[#1B8A8F] hover:underline focus-ring rounded-xs"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};
