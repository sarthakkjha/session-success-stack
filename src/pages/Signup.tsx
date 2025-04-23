import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-2xl font-bold mb-8">Create your Coincentrate account</h1>
      <AuthForm mode="signup" />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-500 hover:text-brand-600">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
