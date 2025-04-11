
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">Log in to FocusChain</h1>
      <AuthForm mode="login" />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-brand-500 hover:text-brand-600">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
