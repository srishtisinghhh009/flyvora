import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Lock, Mail, User as UserIcon, ArrowRight, AlertCircle } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string; search?: string } })?.from;
  const redirectTarget = from ? `${from.pathname}${from.search || ''}` : '/bookings';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signup(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate(redirectTarget, { replace: true });
    } else {
      setError(result.error || 'Failed to create account. Please check your inputs.');
    }
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
            Create your account
          </h1>
          <p className="text-xs text-[#5B6B7A] mt-1">
            Join thousands of travelers exploring India with Wayfold
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
            <label htmlFor="signup-name" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                required
                placeholder="e.g. Priya Nambiar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] pl-10 pr-3.5 py-2.5 focus-ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                placeholder="priya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs font-medium text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] rounded-[10px] pl-10 pr-3.5 py-2.5 focus-ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-xs font-semibold text-[#12263A] mb-1.5">
              Password (min. 6 characters)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5B6B7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
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
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#DCE5E4] text-center text-xs text-[#5B6B7A]">
          Already have an account?{' '}
          <Link
            to="/login"
            state={{ from }}
            className="font-bold text-[#1B8A8F] hover:underline focus-ring rounded-xs"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};
