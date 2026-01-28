import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const AuthScreen: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{type: 'error' | 'success', msg: string} | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        
        // If account created but no session, it means email verification is enabled
        if (data.user && !data.session) {
             setError({
                 type: 'success', 
                 msg: 'Account created! Please check your email for a verification link. To skip verification, disable "Confirm email" in your Supabase dashboard.'
             });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
        <div className="bg-blue-900 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">Student Portal</h1>
            <p className="text-blue-200 text-sm mt-2 relative z-10">JEE (Main) Simulator</p>
        </div>
        
        <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>

            {error && (
                <div className={`mb-6 p-4 text-sm rounded-lg flex items-start gap-3 border ${
                    error.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
                }`}>
                    <span className="text-lg">
                        {error.type === 'error' ? '⚠️' : '✅'}
                    </span>
                    <div>{error.msg}</div>
                </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
                {isSignUp && (
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white text-gray-900"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white text-gray-900"
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required 
                            minLength={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50 focus:bg-white text-gray-900 pr-12"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-blue-600/30 disabled:opacity-50 mt-2"
                >
                    {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button 
                    onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError(null);
                    }}
                    className="font-bold text-blue-600 hover:text-blue-500 hover:underline"
                >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
