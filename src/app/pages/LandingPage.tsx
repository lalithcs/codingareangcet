import React from 'react';
import { Code, Trophy, Users } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ThemeToggle } from '../components/ThemeToggle';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">CodeArena</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Link
              to="/login"
              className="px-4 py-2 text-sm hover:text-foreground transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-[1440px] mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Code className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h1 className="text-6xl mb-6">CodeArena</h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master competitive programming with thousands of problems,
            real-time contests, and a global community of developers.
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Card className="p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl mb-3">165+ Problems</h3>
            <p className="text-muted-foreground">
              Practice with curated problems ranging from easy to hard.
            </p>
          </Card>

          <Card className="p-8">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl mb-3">Live Contests</h3>
            <p className="text-muted-foreground">
              Compete in weekly contests and climb the leaderboard.
            </p>
          </Card>

          <Card className="p-8">
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-info" />
            </div>
            <h3 className="text-xl mb-3">Active Community</h3>
            <p className="text-muted-foreground">
              Learn from thousands of developers worldwide.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
