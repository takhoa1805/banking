'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';
import { AddUserAccountForm } from '../form_addUserAccount';
import { EditUserForm } from '../form_editUser';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string;
  username: string;
  role: string;
  createAt: string;
};
enum Dialogs {
  addAccount = 'addAccount',
  edit = 'edit'
}
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'username',
    header: 'Username'
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Role
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'createAt',
    header: 'Created at'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const [dialog, setDialog] = useState();

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setDialog(Dialogs.addAccount)}>Tạo tài khoản</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setDialog(Dialogs.edit)}>Chỉnh sửa</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            {dialog === Dialogs.addAccount ? (
              <DialogHeader>
                <DialogTitle>Tạo tài khoản</DialogTitle>
              </DialogHeader>
            ) : (
              <DialogHeader>
                <DialogTitle>Chỉnh sửa khách hàng</DialogTitle>
              </DialogHeader>
            )}
            {dialog === Dialogs.addAccount ? (
              <AddUserAccountForm userId={user.id} />
            ) : (
              <EditUserForm userId={user.id} name={user.name} username={user.username} />
            )}
          </DialogContent>
        </Dialog>
      );
    }
  }
];
