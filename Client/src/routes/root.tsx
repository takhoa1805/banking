import { Navigate, Outlet } from 'react-router';

import Header from '@/components/header';

export default function Root() {
  const role = localStorage.getItem('role');
  if (role == 'ADMIN') {
    return <Navigate to='/admin' replace />;
  }
  return role ? (
    <>
      <Header role='user' />
      <div id='detail' className='p-20'>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to='/login' replace />
  );
}
