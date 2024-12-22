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
import { useToast } from '@/hooks/use-toast';

export function AddUserAccountForm({ className, userId, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [isActive, setIsActive] = useState({ state: false, message: '' });
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors }
  } = useForm({ mode: 'onBlur' });
  const onSubmit = async (data) => {
    // console.log(data);
    const token = localStorage.getItem('token');
    setIsActive({ state: false, message: '' });
    await axios
      .post(
        'http://localhost:3000/accounts',
        {
          currentBalance: data.Balance,
          userId: userId
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((res) => {
        toast({
          title: 'Tạo tài khoản thành công'
        });
        setIsActive({ state: false, message: '' });
        reset();
      })
      .catch((err) => {
        setIsActive({ state: true, message: 'Lỗi xảy ra khi tạo tài khoản' });
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
        <AlertDescription>{(errors.Balance && <p>{errors.Balance.message}</p>) || isActive.message}</AlertDescription>
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Số dư ban đầu</Label>
            <Input
              id='Balance'
              type='text'
              {...register('Balance', { required: { value: true, message: 'Balance must not be empty.' } })}
            />
          </div>
          <Button type='submit' className='w-full' disabled={!isValid}>
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
}
