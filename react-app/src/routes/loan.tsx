import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
export default function Loan() {
  return (
    <main className='p-8 space-y-5 max-w-screen-xl mx-auto'>
      <div className='w-full font-bold text-3xl'>Khoản vay</div>
      <div>
        <Button>Thêm khoản vay</Button>
      </div>
      {/* <div className='flex flex-col gap-x-8 max-md:gap-y-5'>
        <div className='mb-5'>
          <Label htmlFor='product_name'>Số tiền chuyển</Label>
          <Input id='product_name' placeholder='Nhập số tiền chuyển...' className='w-full' />
        </div>
        <div className='mb-5'>
          <Label htmlFor='product_code'>Tài khoản nhận</Label>
          <Input id='product_code' placeholder='Nhập tài khoản nhận...' className='w-full' />
        </div>
        <div className='mb-5'>
          <Label htmlFor='description'>Nội dung chuyển</Label>
          <Textarea id='description' placeholder='Nhập nội dung chuyển...' className='w-full' />
        </div>
        <Button onClick={() => {}} className='bg-cyan-700 place-self-end'>
          Chuyển tiền
        </Button>
      </div> */}
    </main>
  );
}
