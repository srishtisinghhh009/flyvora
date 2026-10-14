import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-[#1B8A8F] focus-ring rounded-md px-1.5 py-1 ${
      isActive ? 'text-[#1B8A8F] font-semibold' : 'text-[#12263A]'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#DCE5E4]">
      <div className="max-w-[1120px] mx-auto px-5 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center focus-ring rounded-md py-1"
          aria-label="Flyvora Home"
        >
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/tours" className={navLinkClass}>
            Tours
          </NavLink>
          <NavLink to="/offers" className={navLinkClass}>
            Offers
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
          )}
        </nav>

        {/* Desktop Auth CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/bookings"
                className="flex items-center gap-2 text-xs font-semibold text-[#12263A] hover:text-[#1B8A8F] focus-ring px-2.5 py-1.5 rounded-[10px] border border-[#DCE5E4] bg-[#F5F8F7]"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#1B8A8F]" />
                <span className="max-w-[120px] truncate">{user.name}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-medium text-[#5B6B7A] hover:text-[#12263A] focus-ring px-2.5 py-1.5 rounded-[10px] border border-[#DCE5E4] hover:bg-[#F5F8F7] transition-colors"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-semibold text-white bg-[#1B8A8F] hover:bg-[#157175] active:bg-[#0f5558] transition-colors px-4 py-2 rounded-[10px] focus-ring"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-[#12263A] hover:text-[#1B8A8F] focus-ring rounded-[10px] border border-[#DCE5E4]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DCE5E4] bg-white px-5 py-4 space-y-3">
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#12263A] hover:bg-[#F5F8F7] rounded-[10px]"
            >
              Home
            </Link>
            <Link
              to="/tours"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#12263A] hover:bg-[#F5F8F7] rounded-[10px]"
            >
              Tours
            </Link>
            <Link
              to="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-[#12263A] hover:bg-[#F5F8F7] rounded-[10px]"
            >
              Offers
            </Link>
            {isAuthenticated && (
              <Link
                to="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#12263A] hover:bg-[#F5F8F7] rounded-[10px]"
              >
                My Bookings
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t border-[#DCE5E4] flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="px-3 py-1.5 text-xs text-[#5B6B7A]">
                  Signed in as <span className="font-semibold text-[#12263A]">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-[#12263A] hover:bg-[#F5F8F7] rounded-[10px] flex items-center justify-between"
                >
                  <span>Log out</span>
                  <LogOut className="w-4 h-4 text-[#5B6B7A]" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center text-sm font-semibold text-white bg-[#1B8A8F] hover:bg-[#157175] py-2.5 rounded-[10px]"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center text-sm font-semibold text-[#12263A] bg-[#F5F8F7] border border-[#DCE5E4] py-2.5 rounded-[10px]"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
