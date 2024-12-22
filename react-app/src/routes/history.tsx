import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLoaderData } from 'react-router-dom';
import { User, columns } from '@/components/ui/columns_historyTable';
import { DataTable } from '@/components/DataTable';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedAccount, setAccount] = useState(10000001);
  const [accounts, setAccounts] = useState([]);
  const [isBusy, setBusy] = useState(true);

  const fetchAccounts = async () => {
    const id = `${localStorage.getItem('id')}`;
    try {
      const response = await axios.get(`http://localhost:3000/accounts?user-id=` + id);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/transactions?account-number=` + selectedAccount + '&page=0&size=100'
      );
      // console.log(response);
      setHistory(response.data);
      setBusy(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchHistory();
  }, []);

  return (
    !isBusy && (
      <main className='p-8 space-y-5 max-w-screen-xl mx-auto'>
        <div className='w-full font-bold text-3xl'>Lịch sử giao dịch</div>
        <div className='flex flex-col md:flex-row gap-x-8 max-md:gap-y-5 overflow-x-auto pb-2'>
          {accounts.map((item, index) => (
            <div
              className={
                selectedAccount == item.accountNumber
                  ? 'flex flex-col basis-1/3 shrink-0 space-y-3 cursor-pointer border-green-400'
                  : 'flex flex-col basis-1/3 shrink-0 space-y-3 cursor-pointer'
              }
              onClick={() => {
                setAccount(item.accountNumber);
                fetchHistory();
                // console.log(selectedAccount);
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
        <DataTable columns={columns} data={history.items} page='users' />
      </main>
    )
  );
}
