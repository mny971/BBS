import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { UserRole } from '../types';

interface AuthScreenProps {
  userRole: UserRole;
  onAuthenticated: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ userRole, onAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onAuthenticated();
    } catch (err: any) {
      setError(err?.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const roleLabel =
    userRole === 'RIDER' ? 'Rider' : userRole === 'OPERATOR' ? 'Operator' : 'Admin';

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Sign in as {roleLabel}</h1>
          <p className="text-sm text-gray-500">
            Continue with your Google account to access your {roleLabel.toLowerCase()} dashboard.
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3 shadow-card-hover hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full text-primary text-xs font-bold">
            G
          </span>
          <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
