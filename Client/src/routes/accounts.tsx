import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLoaderData } from 'react-router-dom';
import { Account, columns } from '@/components/ui/columns_accountTable';
import { DataTable } from '@/components/DataTable';

export default function Accounts() {
  const accountQuery = useLoaderData();
  return (
    <main className='p-8 space-y-5 max-w-screen-xl mx-auto'>
      <div className='w-full font-bold text-3xl'>Tài khoản</div>
      <DataTable columns={columns} data={accountQuery} page="accounts"/>
    </main>
  );
}

export async function loader({ params }: { params: LoaderParams }) {
  // console.log(params);
  let response = await fetch('http://localhost:3000/accounts', {
    method: 'get'
  });
  return response.json();
}
