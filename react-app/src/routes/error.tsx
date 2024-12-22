import { Button } from '@/components/ui/button';
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id='error-page' className='flex h-screen'>
      <div className='m-auto space-y-2 min-w-80 pb-40'>
        <img src='/vite.svg' alt='logo of a bank' className='h-16' />
        <h1 className='font-bold text-2xl'>:( Oops!</h1>
        <p>Đã có lỗi xảy ra.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Button asChild>
          <Link to='/'>Quay về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
}
