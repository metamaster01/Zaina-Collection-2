

import React, { useState } from 'react';
import { UserRole } from '../../types';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import BusinessIllustration from '../icons/BusinessIllustration';
import EnvelopeIcon from '../icons/EnvelopeIcon';
import LockIcon from '../icons/LockIcon';

interface AuthPageProps {
  onLogin: (credentials: {email: string, password: string}) => Promise<{success: boolean, error?: string, role?: UserRole}>;
  onRegister: (credentials: {name: string, email: string, password: string}) => Promise<{success: boolean, error?: string}>;
  navigateToPage: (page: 'home') => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister, navigateToPage }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgotPassword'>('login');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!loginData.email || !loginData.password) {
      setError('Email and password are required.');
      return;
    }
    setIsLoading(true);
    const result = await onLogin(loginData);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error || 'Login failed.');
    }
    // On success, the App component will handle navigation via useEffect
  };
  
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
     if (!registerData.name || !registerData.email || !registerData.password) {
      setError('Please fill all fields.');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    const result = await onRegister({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    });
    setIsLoading(false);
  
    if (result.success) {
      setMessage('Registration successful! Please log in.');
      setView('login');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };
  
  const handleForgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!forgotPasswordEmail) {
      setError('Please enter your email address.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
        setMessage('If an account with that email exists, a password reset link has been sent.');
        setIsLoading(false);
        setForgotPasswordEmail('');
    }, 1500);
  };


  const renderLogin = () => (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800">Member Login</h2>
        {message && <p className="text-center text-xs text-green-600 mt-4 bg-green-100 p-2 rounded">{message}</p>}
        <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
            <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="peer w-full pl-10 pr-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-transparent focus:outline-none transition-colors"
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F87A7D] to-[#7873f5] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"></span>
            </div>
            <div className="relative">
                <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="peer w-full pl-10 pr-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-transparent focus:outline-none transition-colors"
                />
                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F87A7D] to-[#7873f5] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"></span>
            </div>
            <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-gray-500">
                    <input type="checkbox" className="h-3 w-3 rounded border-gray-300 text-red-500 focus:ring-red-400" />
                    <span className="ml-2">Remember Me</span>
                </label>
                <button type="button" onClick={() => setView('forgotPassword')} className="font-medium text-gray-500 hover:text-red-500">Forgot Your Password</button>
            </div>
            {error && <p className="text-center text-xs text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F87A7D] to-[#7873f5] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F87A7D] transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Logging in...' : 'LOGIN'}
            </button>
        </form>
         <p className="text-xs text-center text-gray-500 mt-6">
            Not a member? <button onClick={() => setView('register')} className="font-semibold text-[#34D399] hover:text-green-500">Create Account</button>
        </p>
    </div>
  );
  
  const renderRegister = () => (
     <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
        <form onSubmit={handleRegisterSubmit} className="mt-8 space-y-6">
             <div className="relative">
                <input 
                    type="text"
                    placeholder="Full Name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    className="peer w-full pr-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-transparent focus:outline-none transition-colors"
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F87A7D] to-[#7873f5] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"></span>
            </div>
             <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className="peer w-full pl-10 pr-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-transparent focus:outline-none transition-colors"
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F87A7D] to-[#7873f5] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"></span>
            </div>
             <div className="relative">
                <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    className="peer w-full pl-10 pr-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-transparent focus:outline-none transition-colors"
                />
                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F87A7D] to-[#7873f5] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"></span>
            </div>
            <div className="relative">
                <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    className="peer w-full pl-10 pr-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-transparent focus:outline-none transition-colors"
                />
                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F87A7D] to-[#7873f5] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"></span>
            </div>
            {error && <p className="text-center text-xs text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F87A7D] to-[#7873f5] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F87A7D] transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Registering...' : 'REGISTER'}
            </button>
        </form>
         <p className="text-xs text-center text-gray-500 mt-6">
            Already a member? <button onClick={() => setView('login')} className="font-semibold text-[#34D399] hover:text-green-500">Login Now</button>
        </p>
    </div>
  );
  
  const renderForgotPassword = () => (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <p className="mt-2 text-sm text-center text-gray-500">Enter your email and we'll send you instructions to reset your password.</p>
        {message && <p className="text-center text-xs text-green-600 mt-4 bg-green-100 p-2 rounded">{message}</p>}
        <form onSubmit={handleForgotPasswordSubmit} className="mt-8 space-y-6">
            <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                    type="email"
                    placeholder="Email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="peer w-full pl-10 pr-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-transparent focus:outline-none transition-colors"
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200"></span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F87A7D] to-[#7873f5] transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"></span>
            </div>
            {error && <p className="text-center text-xs text-red-500">{error}</p>}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F87A7D] to-[#7873f5] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F87A7D] transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
        </form>
         <p className="text-xs text-center text-gray-500 mt-6">
            Remembered your password? <button onClick={() => setView('login')} className="font-semibold text-[#34D399] hover:text-green-500">Back to Login</button>
        </p>
    </div>
  );

  const renderContent = () => {
      switch(view) {
          case 'register': return renderRegister();
          case 'forgotPassword': return renderForgotPassword();
          case 'login':
          default:
            return renderLogin();
      }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-bl from-[#F87A7D] to-[#F24B5D] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#7873f5] to-[#4F46E5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-4000 { animation-delay: -4000ms; }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
      
      <main className="w-full max-w-6xl mx-auto z-10">
        <div className="grid md:grid-cols-2 items-center gap-16">
          
          <div className="hidden md:block animate-fade-in">
            <button onClick={() => navigateToPage('home')} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-12 text-sm font-medium">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back To Home Screen
            </button>
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Discover Timeless Elegance</h1>
                <p className="text-gray-500 text-sm leading-relaxed">Create your Zaina Collection account to manage orders, build your wishlist, and enjoy a faster checkout. Join us to experience a world where heritage craftsmanship meets modern style.</p>
                <BusinessIllustration className="w-full max-w-lg mx-auto mt-8" />
                 <div className="flex justify-center items-center space-x-2 pt-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            {renderContent()}
          </div>

        </div>
      </main>
    </div>
  );
};

export default AuthPage;