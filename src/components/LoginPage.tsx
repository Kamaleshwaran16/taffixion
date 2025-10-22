import { useState } from 'react';
import { Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-hover to-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-primary" />
              <Activity className="w-12 h-12 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Traffic Control System
            </h1>
            <p className="text-muted-foreground text-sm">
              Government of Odisha
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover transition-colors"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Authorized personnel only
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 Government of Odisha
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
