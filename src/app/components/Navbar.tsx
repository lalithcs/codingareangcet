import React, { useState } from 'react';
import { Code, Trophy, User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  showAdminLink?: boolean;
}

export function Navbar({ isAuthenticated = false, onLogout, showAdminLink = true }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">CodeArena</span>
          </a>
          
          {isAuthenticated && (
            <div className="flex items-center gap-6">
              <a 
                href="/problems" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Problems
              </a>
              <a 
                href="/leaderboard" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Leaderboard
              </a>
              {showAdminLink && (
                <a 
                  href="/admin" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-20">
                    <a
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </a>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onLogout?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="px-4 py-2 text-sm hover:text-foreground transition-colors"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}