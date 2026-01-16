import React, { useState } from 'react';
import { Input } from './design-system/Input';
import { Button } from './design-system/Button';
import { NotificationBanner } from './design-system/NotificationBanner';
import { Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'Prosjektleder' | 'Forsikringsselskap') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate login validation
    setTimeout(() => {
      if (!email || !password) {
        setError('Vennligst fyll ut alle feltene');
        setLoading(false);
        return;
      }
      
      // Mock authentication
      // Email patterns to determine role:
      // prosjektleder@* -> Project Manager
      // forsikring@* -> Insurance Company
      if (email.includes('prosjektleder')) {
        onLogin('Prosjektleder');
      } else if (email.includes('forsikring')) {
        onLogin('Forsikringsselskap');
      } else {
        setError('Ugyldig påloggingsinformasjon');
      }
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dcf1ff] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="https://ocab.no/wp-content/uploads/2025/04/ocab-logo-01.svg" 
              alt="Ocab" 
              className="h-12"
            />
          </div>
          <h2 className="text-[#21272a] mb-1">Kundereisen</h2>
          <p className="text-[#697077]">Logg inn for å fortsette</p>
        </div>
        
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <NotificationBanner
                type="error"
                message={error}
                onClose={() => setError('')}
              />
            )}
            
            <Input
              label="E-post"
              type="email"
              placeholder="din.epost@eksempel.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              required
              fullWidth
            />
            
            <Input
              label="Passord"
              type="password"
              placeholder="Skriv inn ditt passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
              required
              fullWidth
            />
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={loading}
            >
              {loading ? 'Logger inn...' : 'Logg inn'}
            </Button>
          </form>
          
          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-[#dde1e6]">
            <p className="text-sm text-[#697077] text-center mb-3">
              Demo-pålogging:
            </p>
            <div className="space-y-2 text-sm">
              <div className="bg-[#f4f4f4] p-3 rounded-lg">
                <p className="text-[#21272a]">
                  <strong>Prosjektleder:</strong>
                </p>
                <p className="text-[#697077]">prosjektleder@ocab.no / passord</p>
              </div>
              <div className="bg-[#f4f4f4] p-3 rounded-lg">
                <p className="text-[#21272a]">
                  <strong>Forsikringsselskap:</strong>
                </p>
                <p className="text-[#697077]">forsikring@dittselskap.no / passord</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-sm text-[#697077] mt-6">
          © 2025 Ocab. Alle rettigheter reservert.
        </p>
      </div>
    </div>
  );
}