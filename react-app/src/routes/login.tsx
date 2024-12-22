import { LoginForm } from '@/components/form_login';
import { useEffect } from 'react';
import { Navigate } from 'react-router';

export default function LoginPage() {
  const role = localStorage.getItem('role');
  if (role == 'ADMIN') {
    return <Navigate to='/admin' replace />;
  } else if (role == 'USER') {
    return <Navigate to='/' replace />;
  } else
    return (
      <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-lime-300 to-emerald-700'>
        <div className='w-full max-w-sm'>
          <LoginForm />
        </div>
      </div>
    );
}
