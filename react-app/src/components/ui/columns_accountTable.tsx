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
import { WithdrawForm } from '../form_withdraw';
import { DepositForm } from '../form_deposit';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Account = {
  accountNumber: string;
  currentBalance: number;
  status: string;
  createAt: string;
  accountOwnerId: string;
  accountName: string;
};
enum Dialogs {
  withdraw = 'withdraw',
  deposit = 'deposit'
}
export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: 'accountNumber',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Số TK
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'currentBalance',
    header: 'Số dư'
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Trạng thái
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
    accessorKey: 'accountName',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tên khách hàng
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original;
      const [dialog, setDialog] = useState();
      const { toast } = useToast();
      const token = localStorage.getItem('token');

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
                <DropdownMenuItem onClick={() => setDialog(Dialogs.deposit)}>Nạp tiền</DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setDialog(Dialogs.withdraw)}>Rút tiền</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await axios
                    .get('http://localhost:3000/accounts/' + account.accountNumber + '/suspend', {
                      headers: {
                        Authorization: 'Bearer ' + token
                      }
                    })
                    .then((res) => {
                      toast({
                        title: 'Khoá tài khoản thành công'
                      });
                    })
                    .catch((err) => {
                      toast({
                        title: 'Khoá tài khoản thành công'
                      });
                    });
                }}
              >
                Khoá tài khoản
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await axios
                    .get('http://localhost:3000/accounts/' + account.accountNumber + '/open', {
                      headers: {
                        Authorization: 'Bearer ' + token
                      }
                    })
                    .then((res) => {
                      toast({
                        title: 'Mở tài khoản thành công'
                      });
                    })
                    .catch((err) => {
                      toast({
                        title: 'Mở tài khoản thành công'
                      });
                    });
                }}
              >
                Mở tài khoản
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await axios
                    .get('http://localhost:3000/accounts/' + account.accountNumber + '/close', {
                      headers: {
                        Authorization: 'Bearer ' + token
                      }
                    })
                    .then((res) => {
                      toast({
                        title: 'Đóng tài khoản thành công'
                      });
                    })
                    .catch((err) => {
                      toast({
                        title: 'Đóng tài khoản thành công'
                      });
                    });
                }}
              >
                Đóng tài khoản
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            {dialog == Dialogs.withdraw ? (
              <DialogHeader>
                <DialogTitle>Nhập số tiền</DialogTitle>
              </DialogHeader>
            ) : (
              <DialogHeader>
                <DialogTitle>Nhập số tiền</DialogTitle>
              </DialogHeader>
            )}
            {dialog === Dialogs.withdraw ? (
              <WithdrawForm accountId={account.accountNumber} />
            ) : (
              <DepositForm accountId={account.accountNumber} />
            )}
          </DialogContent>
        </Dialog>
      );
    }
  }
];
