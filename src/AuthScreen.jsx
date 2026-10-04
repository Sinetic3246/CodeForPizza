import React, { useState } from 'react';
import { Coffee, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Moon, Sun, Store, UserRound, Users, User } from 'lucide-react';
import './AuthScreen.css';

export default function AuthScreen({ onSignIn, theme, toggleTheme }) {
  const [mode, setMode] = useState('signin');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (event) => {
    event.preventDefault();
    onSignIn(role, { 
      createAccount: mode === 'create', 
      email, 
      fullName: (mode === 'create' && role !== 'staff') ? fullName.trim() : '' 
    });
  };

  return (
    <main className="auth-screen">
      <section className="auth-card">
        <button className="auth-theme" onClick={toggleTheme} type="button" aria-label="Toggle color theme">
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>

        <div className="auth-brand-icon"><Coffee size={27} /></div>
        <h1>CafeoPass</h1>
        <p className="auth-subtitle">Ullens Cafe Fintech Portal</p>

        <div className="auth-tabs" role="tablist" aria-label="Account access">
          <button type="button" className={mode === 'signin' ? 'selected' : ''} onClick={() => setMode('signin')}>Sign In</button>
          <button type="button" className={mode === 'create' ? 'selected' : ''} onClick={() => setMode('create')}>Create Account</button>
        </div>

        <form onSubmit={submit}>
          {/* Full Name field shown only in 'Create Account' for Students and Parents */}
          {mode === 'create' && role !== 'staff' && (
            <>
              <label className="auth-label" htmlFor="auth-fullname">Full Name</label>
              <div className="auth-input-wrap" style={{ marginBottom: '14px' }}>
                <User size={17} />
                <input 
                  id="auth-fullname" 
                  type="text" 
                  placeholder="Enter your full name"
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                />
              </div>
            </>
          )}

          <label className="auth-label" htmlFor="auth-email">Email address</label>
          <div className="auth-input-wrap">
            <Mail size={17} />
            <input 
              id="auth-email" 
              type="email" 
              placeholder="Enter your email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="auth-label-row">
            <label className="auth-label" htmlFor="auth-password">Password</label>
            <button className="forgot-link" type="button" onClick={() => window.alert('Password reset instructions will be sent to your email.')}>Forgot?</button>
          </div>
          <div className="auth-input-wrap">
            <Lock size={17} />
            <input 
              id="auth-password" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength={4} 
            />
            <button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <div className="auth-role-select" aria-label="Portal Selection">
            <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}><UserRound size={13} /> Student</button>
            <button type="button" className={role === 'parent' ? 'active' : ''} onClick={() => setRole('parent')}><Users size={13} /> Parent</button>
            <button type="button" className={role === 'staff' ? 'active' : ''} onClick={() => setRole('staff')}><Store size={13} /> Staff POS</button>
          </div>

          <button className="auth-submit" type="submit">
            {mode === 'signin' ? 'Sign In to Wallet' : 'Create Account'}
            <ArrowRight size={17} />
          </button>
        </form>

        <div className="auth-secure-note"><ShieldCheck size={15} /> Encrypted Pass System <span>•</span> Ullens School</div>
      </section>
    </main>
  );
}