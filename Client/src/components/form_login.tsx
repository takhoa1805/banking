import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [isActive, setIsActive] = useState({ state: false, message: '' });
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' });
  const onSubmit = async (data) => {
    setIsActive({ state: false, message: '' });
    await axios
      .post('http://localhost:3000/auth/login', {
        username: data.Username,
        password: data.Password
      })
      .then((res) => {
        setIsActive({ state: false, message: '' });
        localStorage.setItem('token', res.data.token);
        const decoded = jwtDecode(res.data.token);
        localStorage.setItem('id', decoded.id);
        localStorage.setItem('name', decoded.name);
        localStorage.setItem('role', decoded.role);
        navigate('/');
      })
      .catch((err) => {
        setIsActive({ state: true, message: 'Failed to log in. Please check your credentials.' });
      });
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>DBankMS</CardTitle>
          <CardDescription>Đăng nhập vào DBankMS</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert
            variant='destructive'
            className={isActive.state || errors.Username || errors.Password ? 'mb-4' : 'mb-4 hidden'}
          >
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {(errors.Username && <p>{errors.Username.message}</p>) ||
                (errors.Password && <p>{errors.Password.message}</p>) ||
                isActive.message}
            </AlertDescription>
          </Alert>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  type='text'
                  {...register('Username', { required: { value: true, message: 'Username must not be empty.' } })}
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  {...register('Password', { required: { value: true, message: 'Password must not be empty.' } })}
                />
              </div>
              <Button type='submit' className='w-full' disabled={!isValid}>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
