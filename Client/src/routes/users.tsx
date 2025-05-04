import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLoaderData } from 'react-router-dom';
import { User, columns } from '@/components/ui/columns_userTable';
import { DataTable } from '@/components/DataTable';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { AddUserForm } from '@/components/form_addUser';

type userQueryType = {
  totalItems: number;
  items: [];
  page: number;
  size: number;
};

export default function Users() {
  const userQuery = useLoaderData() as userQueryType;
  return (
    <main className='p-8 space-y-5 max-w-screen-xl mx-auto'>
      <div className='w-full font-bold text-3xl'>Khách hàng</div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Thêm khách hàng</Button>
          </DialogTrigger>
          <DialogContent
            className='sm:max-w-[425px]'
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>Thêm khách hàng</DialogTitle>
            </DialogHeader>
            <AddUserForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={userQuery.items} page='users' />
    </main>
  );
}

export async function loader({ params }: { params: LoaderParams }) {
  // console.log(params);
  const bearer_token = `Bearer ${localStorage.getItem('token')}`;
  let response = await fetch('http://localhost:3000/users?page=0&size=100', {
    method: 'get',
    headers: new Headers({
      Authorization: bearer_token
    })
  });
  return response.json();
}
