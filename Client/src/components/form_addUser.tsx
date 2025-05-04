import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';
import { useState } from 'react';
import { Select } from 'flowbite-react';
import { useToast } from '@/hooks/use-toast';

export function AddUserForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [isActive, setIsActive] = useState({ state: false, message: '' });
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' });
  const onSubmit = async (data) => {
    // console.log(data);
    const token = localStorage.getItem('token');
    setIsActive({ state: false, message: '' });
    await axios
      .post(
        'http://localhost:3000/users',
        {
          name: data.Name,
          username: data.Username,
          password: data.Password,
          role: data.Role,
          email: data.Email
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((res) => {
        toast({
          title: 'Thêm khách hàng thành công'
        });
        setIsActive({ state: false, message: '' });
        reset();
      })
      .catch((err) => {
        setIsActive({ state: true, message: 'Failed to add a new user' });
        reset();
      });
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Alert
        variant='destructive'
        className={isActive.state || errors.Username || errors.Password || errors.Name || errors.Email ? '' : ' hidden'}
      >
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>
          {(errors.Name && <p>{errors.Name.message}</p>) ||
            (errors.Username && <p>{errors.Username.message}</p>) ||
            (errors.Email && <p>{errors.Email.message}</p>) ||
            (errors.Password && <p>{errors.Password.message}</p>) ||
            isActive.message}
        </AlertDescription>
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='text'
              {...register('Name', { required: { value: true, message: 'Name must not be empty.' } })}
            />
          </div>
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
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='email'>Email</Label>
            </div>
            <Input
              id='email'
              type='email'
              {...register('Email', { required: { value: true, message: 'Email must not be empty.' } })}
            />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='self-center'>
              <Label htmlFor='email'>Loại tài khoản</Label>
            </div>
            <div className='justify-self-end'>
              <Select
                {...register('Role', { required: { value: true, message: 'Role must not be empty.' } })}
                defaultValue={'USER'}
              >
                <option value='ADMIN'>Admin</option>
                <option value='USER'>User</option>
              </Select>
            </div>
          </div>
          <Button type='submit' className='w-full' disabled={!isValid}>
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
}
