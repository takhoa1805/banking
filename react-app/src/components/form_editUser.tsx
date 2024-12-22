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

export function EditUserForm({ className, userId, name, username, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [isActive, setIsActive] = useState({ state: false, message: '' });
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });
  const onSubmit = async (data) => {
    // console.log(data);
    const token = localStorage.getItem('token');
    setIsActive({ state: false, message: '' });
    await axios
      .put(
        'http://localhost:3000/users',
        {
          id: userId,
          name: data.name,
          username: data.Username,
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
          title: 'Chỉnh sửa khách hàng thành công'
        });
        setIsActive({ state: false, message: '' });
        reset();
      })
      .catch((err) => {
        setIsActive({ state: true, message: 'Lỗi xảy ra khi chỉnh sửa khách hàng' });
        reset();
      });
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Alert
        variant='destructive'
        className={isActive.state || errors.Username || errors.Name || errors.Email ? '' : ' hidden'}
      >
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>
          {(errors.Name && <p>{errors.Name.message}</p>) ||
            (errors.Username && <p>{errors.Username.message}</p>) ||
            (errors.Email && <p>{errors.Email.message}</p>) ||
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
              defaultValue={name}
              {...register('Name', { required: { value: true, message: 'Name must not be empty.' } })}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              type='text'
              defaultValue={username}
              {...register('Username', { required: { value: true, message: 'Username must not be empty.' } })}
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
          <Button type='submit' className='w-full' disabled={!isValid}>
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
}
