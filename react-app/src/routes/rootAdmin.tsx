import { Navigate, Outlet } from 'react-router';

import Header from '@/components/header';

export default function RootAdmin() {
  const role = localStorage.getItem('role');
  if (role == 'ADMIN') {
    return (
      <>
        <Header role='admin' />
        <div id='detail' className='p-20'>
          <Outlet />
        </div>
      </>
    );
  } else {
    throw new Error('You are not authorized to view this resource.');
  }
}
