import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'grave_demo_users';
const SESSION_KEY = 'grave_demo_session';

async function passwordHash(value, saltHex) {
  if (!window.crypto?.subtle) throw new Error('Secure password hashing is unavailable in this browser. Use localhost or HTTPS.');
  const salt = saltHex ? Uint8Array.from(saltHex.match(/.{2}/g).map((part) => parseInt(part, 16))) : window.crypto.getRandomValues(new Uint8Array(16));
  const key = await window.crypto.subtle.importKey('raw', new TextEncoder().encode(value), 'PBKDF2', false, ['deriveBits']);
  const bits = await window.crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 210000, hash: 'SHA-256' }, key, 256);
  const hash = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
  const saltValue = Array.from(salt).map((b) => b.toString(16).padStart(2, '0')).join('');
  return { hash, salt: saltValue };
}
const readUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
const safeUser = ({ id, name, email, phone = '', city = '', joinedAt }) => ({ id, name, email, phone, city, joinedAt });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      return session ? safeUser(session) : null;
    } catch { return null; }
  });

  useEffect(() => {
    const sync = (event) => {
      if (event.key === SESSION_KEY) {
        try { setUser(event.newValue ? safeUser(JSON.parse(event.newValue)) : null); }
        catch { setUser(null); }
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const signup = async ({ name, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = readUsers();
    if (users.some((item) => item.email === cleanEmail)) throw new Error('An account with this email already exists.');
    const account = {
      id: window.crypto?.randomUUID?.() || `grave-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      ...await passwordHash(password),
      phone: '',
      city: '',
      joinedAt: new Date().toISOString()
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, account]));
    const current = safeUser(account);
    localStorage.setItem(SESSION_KEY, JSON.stringify(current));
    setUser(current);
    return current;
  };

  const login = async ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const account = readUsers().find((item) => item.email === cleanEmail);
    if (!account) throw new Error('Email or password is incorrect.');
    const checked = await passwordHash(password, account.salt);
    if (account.hash !== checked.hash) throw new Error('Email or password is incorrect.');
    const current = safeUser(account);
    localStorage.setItem(SESSION_KEY, JSON.stringify(current));
    setUser(current);
    return current;
  };

  const updateProfile = (changes) => {
    if (!user) return;
    const updated = { ...user, ...changes, email: user.email };
    const users = readUsers().map((item) => item.id === user.id ? { ...item, ...changes, email: user.email } : item);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setUser(updated);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthenticated: !!user, signup, login, logout, updateProfile }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
