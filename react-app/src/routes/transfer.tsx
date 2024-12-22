import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLoaderData } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { TransferMoneyForm } from '@/components/form_transferMoney';

export default function Transfer() {
  const accountsQuery = useLoaderData();
  const [selectedAccount, setAccount] = useState();
  return (
    <main className='p-8 space-y-5 max-w-screen-xl mx-auto'>
      <div className='w-full font-bold text-3xl'>Chuyển tiền</div>
      <div className='flex flex-col md:flex-row gap-x-8 max-md:gap-y-5 overflow-x-auto pb-2'>
        {accountsQuery.map((item, index) => (
          <div
            className={
              selectedAccount == item.accountNumber
                ? 'flex flex-col basis-1/3 shrink-0 space-y-3 cursor-pointer border-green-400'
                : 'flex flex-col basis-1/3 shrink-0 space-y-3 cursor-pointer'
            }
            onClick={() => {
              setAccount(item.accountNumber);
              console.log(selectedAccount);
            }}
            key={index}
          >
            <div className='bg-gray-100 p-6 rounded-md border-2'>
              <div>Tài khoản {item.accountNumber}</div>
              <p className='text-xl'>Số dư: {item.currentBalance}</p>
            </div>
          </div>
        ))}
      </div>
      <TransferMoneyForm accountNumber={selectedAccount} />
    </main>
  );
}

export async function loader({ params }: { params: LoaderParams }) {
  // console.log(params);
  const id = `${localStorage.getItem('id')}`;
  let response = await fetch('http://localhost:3000/accounts?user-id=' + id, {
    method: 'get'
  });
  return response.json();
}
