import React, { useState } from 'react';
import { Coffee, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Moon, Sun, Store, UserRound, Users, User, AlertCircle, QrCode, Check } from 'lucide-react';
import './AuthScreen.css';

export default function AuthScreen({ onSignIn, theme, toggleTheme, currentStudentId = '' }) {
  const [mode, setMode] = useState('signin');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [studentIdInput, setStudentIdInput] = useState(currentStudentId || '');
  const [isStudentLinked, setIsStudentLinked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('registeredUsers');
    return saved ? JSON.parse(saved) : [];
  });

  const handleLinkStudent = () => {
    if (!studentIdInput.trim()) {
      const fallbackId = currentStudentId || `STU-${Date.now().toString(36).toUpperCase().slice(-4)}-7721`;
      setStudentIdInput(fallbackId);
      setIsStudentLinked(true);
      return;
    }
    setIsStudentLinked(true);
  };

  const submit = (event) => {
    event.preventDefault();
    setErrorMsg('');
    const trimmedEmail = email.trim().toLowerCase();

    if (mode === 'signin') {
      const userExists = registeredUsers.some(
        (u) => u.email.toLowerCase() === trimmedEmail && u.role === role
      );

      if (!userExists) {
        setErrorMsg(`No ${role} account found for "${email}". You must create an account first in order to sign in.`);
        return;
      }

      const userAcc = registeredUsers.find((u) => u.email.toLowerCase() === trimmedEmail && u.role === role);
      onSignIn(role, { 
        createAccount: false, 
        email: trimmedEmail, 
        fullName: userAcc?.fullName || '',
        studentId: userAcc?.studentId || studentIdInput
      });
    } else {
      const userExists = registeredUsers.some(
        (u) => u.email.toLowerCase() === trimmedEmail && u.role === role
      );

      if (userExists) {
        setErrorMsg('An account with this email already exists for this role. Please sign in instead.');
        return;
      }

      const newUser = {
        email: trimmedEmail,
        role,
        fullName: role !== 'staff' ? fullName.trim() : 'Staff Member',
        studentId: role === 'parent' ? studentIdInput.trim() : undefined
      };

      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      onSignIn(role, { 
        createAccount: true, 
        email: trimmedEmail, 
        fullName: newUser.fullName,
        studentId: newUser.studentId
      });
    }
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
          <button 
            type="button" 
            className={mode === 'signin' ? 'selected' : ''} 
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={mode === 'create' ? 'selected' : ''} 
            onClick={() => { setMode('create'); setErrorMsg(''); }}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="auth-error-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={submit}>
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

          {mode === 'create' && role === 'parent' && (
            <>
              <label className="auth-label" htmlFor="auth-studentid">Student ID</label>
              <div className="auth-input-group">
                <div className="auth-input-wrap" style={{ flex: 1 }}>
                  <QrCode size={17} />
                  <input 
                    id="auth-studentid" 
                    type="text" 
                    placeholder="e.g. STU-1234-5678"
                    value={studentIdInput} 
                    onChange={(e) => {
                      setStudentIdInput(e.target.value);
                      setIsStudentLinked(false);
                    }} 
                    required 
                  />
                </div>
                <button 
                  type="button" 
                  className="auth-link-student-btn" 
                  onClick={handleLinkStudent}
                >
                  <Check size={14} /> Link Student
                </button>
              </div>
              {isStudentLinked && (
                <div className="auth-linked-badge">
                  <Check size={14} /> Student ID linked to Parent account!
                </div>
              )}
            </>
          )}

          <label className="auth-label" htmlFor="auth-email">Email address</label>
          <div className="auth-input-wrap" style={{ marginBottom: '14px' }}>
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
            {mode === 'signin' && (
              <button 
                className="forgot-link" 
                type="button" 
                onClick={() => window.alert('Password reset instructions will be sent to your registered email.')}
              >
                Forgot?
              </button>
            )}
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
            <button 
              className="password-toggle" 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <div className="auth-role-select" aria-label="Portal Selection">
            <button 
              type="button" 
              className={role === 'student' ? 'active' : ''} 
              onClick={() => { setRole('student'); setErrorMsg(''); }}
            >
              <UserRound size={13} /> Student
            </button>
            <button 
              type="button" 
              className={role === 'parent' ? 'active' : ''} 
              onClick={() => { setRole('parent'); setErrorMsg(''); }}
            >
              <Users size={13} /> Parent
            </button>
            <button 
              type="button" 
              className={role === 'staff' ? 'active' : ''} 
              onClick={() => { setRole('staff'); setErrorMsg(''); }}
            >
              <Store size={13} /> Staff POS
            </button>
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