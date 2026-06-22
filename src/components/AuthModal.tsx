import React, { useState } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface AuthModalProps {
  language: 'en' | 'zh' | string;
  onClose: () => void;
}

const copy: Record<string, any> = {
  zh: {
    loginTitle: '登录',
    signupTitle: '注册账号',
    email: '邮箱',
    password: '密码',
    loginBtn: '登录',
    signupBtn: '注册',
    switchToSignup: '还没有账号？点此注册',
    switchToLogin: '已经有账号？点此登录',
    signupSuccess: '注册成功！请前往邮箱点击验证链接，验证后即可登录。',
    passwordHint: '至少 6 位',
    googleBtn: '用 Google 登录',
    or: '或',
  },
  en: {
    loginTitle: 'Log In',
    signupTitle: 'Create Account',
    email: 'Email',
    password: 'Password',
    loginBtn: 'Log In',
    signupBtn: 'Sign Up',
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: 'Already have an account? Log in',
    signupSuccess: 'Account created! Please check your email and click the confirmation link before logging in.',
    passwordHint: 'At least 6 characters',
    googleBtn: 'Continue with Google',
    or: 'or',
  },
};

export function AuthModal({ language, onClose }: AuthModalProps) {
  const t = copy[language] || copy.en;
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);

    const result = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (mode === 'signup') {
      setSuccessMsg(t.signupSuccess);
    } else {
      onClose();
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
    // 成功的话,浏览器会自动跳转去 Google 登录页,不需要在这里关闭弹窗
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-sm bg-[#FCFAF6] border border-[#4A463F]/15 rounded-none p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#8C7A6B] hover:text-[#4A463F] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="font-serif text-2xl text-[#4A463F] mb-6">
          {mode === 'login' ? t.loginTitle : t.signupTitle}
        </h2>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-2 border border-[#4A463F]/20 bg-white py-2.5 text-sm text-[#4A463F] hover:bg-black/5 transition-colors disabled:opacity-60 cursor-pointer mb-4"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {t.googleBtn}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#4A463F]/15" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C857B]">{t.or}</span>
          <div className="flex-1 h-px bg-[#4A463F]/15" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8C857B] block mb-1.5">
              {t.email}
            </label>
            <div className="flex items-center gap-2 border border-[#4A463F]/15 bg-white px-3 py-2">
              <Mail className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-[#4A463F]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#8C857B] block mb-1.5">
              {t.password}
            </label>
            <div className="flex items-center gap-2 border border-[#4A463F]/15 bg-white px-3 py-2">
              <Lock className="w-3.5 h-3.5 text-[#8C7A6B] shrink-0" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-[#4A463F]"
                placeholder="••••••"
              />
            </div>
            {mode === 'signup' && (
              <p className="text-[10px] text-[#8C857B] mt-1">{t.passwordHint}</p>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </p>
          )}
          {successMsg && (
            <p className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-[#4A463F] text-[#FAF8F5] py-2.5 text-sm font-mono uppercase tracking-wider hover:bg-[#3a3730] transition-colors disabled:opacity-60 cursor-pointer"
          >
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {mode === 'login' ? t.loginBtn : t.signupBtn}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            setError(null);
            setSuccessMsg(null);
          }}
          className="w-full text-center text-xs text-[#8C7A6B] hover:text-[#4A463F] mt-4 underline-offset-2 hover:underline cursor-pointer"
        >
          {mode === 'login' ? t.switchToSignup : t.switchToLogin}
        </button>
      </div>
    </div>
  );
}
