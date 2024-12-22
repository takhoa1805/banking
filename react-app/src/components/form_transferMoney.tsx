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

export function TransferMoneyForm({ className, accountNumber, ...props }: React.ComponentPropsWithoutRef<'div'>) {
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
        'http://localhost:3000/transactions/transfer',
        {
          type: 'TRANSFER',
          amount: Number(data.Amount),
          description: data.Description,
          accountNumber: accountNumber,
          relatedAccountNumber: data.RelatedAccountNumber
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((res) => {
        toast({
          title: 'Chuyển tiền thành công'
        });
        setIsActive({ state: false, message: '' });
        reset();
      })
      .catch((err) => {
        setIsActive({ state: true, message: 'Lỗi xảy ra khi chuyển tiền' });
        reset();
      });
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Alert variant='destructive' className={isActive.state ? '' : ' hidden'}>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>{(errors.Balance && <p>{errors.Balance.message}</p>) || isActive.message}</AlertDescription>
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='amount'>Số tiền chuyển</Label>
            <Input
              id='Amount'
              type='text'
              {...register('Amount', { required: { value: true, message: 'Balance must not be empty.' } })}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='relatedAccountNumber'>Tài khoản nhận</Label>
            <Input
              id='RelatedAccountNumber'
              type='text'
              {...register('RelatedAccountNumber', {
                required: { value: true, message: 'Balance must not be empty.' }
              })}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='description'>Nội dung chuyển</Label>
            <Input
              id='Description'
              type='text'
              {...register('Description', { required: { value: true, message: 'Balance must not be empty.' } })}
            />
          </div>
          <Button type='submit' className='w-full' disabled={!isValid}>
            Chuyển tiền
          </Button>
        </div>
      </form>
    </div>
  );
}
