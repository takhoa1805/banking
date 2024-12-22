import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function Header({ role }) {
  let navigate = useNavigate();
  if (role == 'admin') {
    return (
      <div className='w-full flex justify-between items-center px-4 bg-gradient-to-r from-green-400 to-emerald-700 fixed z-50 text-white'>
        <header className='text-white p-2 flex space-x-5'>
          <h1 className='text-3xl font-bold'>DBankMS</h1>
        </header>
        <nav className='space-x-4'>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='' end>
            Trang chủ
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='loan'>
            Khoản vay
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='users'>
            Khách hàng
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='accounts'>
            Tài khoản
          </NavLink>
        </nav>
        <div className='flex space-x-4'>
          <p className='self-center'>{localStorage.getItem('name')}</p>
          <Button
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    );
  } else if (role == 'user') {
    return (
      <div className='w-full flex justify-between items-center px-4 bg-gradient-to-r from-green-400 to-emerald-700 fixed z-50 text-white'>
        <header className='text-white p-2 flex space-x-5'>
          <h1 className='text-3xl font-bold'>DBankMS</h1>
        </header>
        <nav className='space-x-4'>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='/' end>
            Trang chủ
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='/transfer' end>
            Chuyển tiền
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='/loan'>
            Khoản vay
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'font-bold' : '')} to='/history'>
            Lịch sử
          </NavLink>
        </nav>
        <div className='flex space-x-4'>
          <p className='self-center'>{localStorage.getItem('name')}</p>
          <Button
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    );
  }
}
