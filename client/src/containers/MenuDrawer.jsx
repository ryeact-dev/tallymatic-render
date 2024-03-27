import LeftSidebar from './LeftSidebar';
import { Menu } from 'lucide-react';

export default function MenuDrawer() {
  // Close the drawer when the user click on the backdrop
  const close = () => {
    document.getElementById('drawer-toggle').click();
  };

  return (
    <div className='flex'>
      <input
        type='checkbox'
        id='drawer-toggle'
        className='relative sr-only peer'
      />
      <label
        htmlFor='drawer-toggle'
        // className='absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64'
        className='hover:cursor-pointer dark:hover:text-accent hover:text-primary'
      >
        <Menu className='h-5 w-5' />
      </label>

      <div
        onClick={close}
        className={
          'fixed inset-0 z-10 bg-black/50 peer-checked:flex hidden transition-[opacity] duration-300 ease-in-out backdrop-blur-[1px]'
        }
      ></div>
      <div className='fixed top-0 -left-1 z-20 w-64 h-full transition-all duration-500 transform -translate-x-full bg-background shadow-lg peer-checked:translate-x-0'>
        <div className='px-3 pt-2'>
          <div className='text-foreground flex space-x-1 items-center'>
            <label
              htmlFor='drawer-toggle'
              // className='absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64'
              className='hover:cursor-pointer dark:hover:text-accent hover:text-primary'
            >
              <Menu className='h-5 w-5' />
            </label>
            <div>
              <h1 className='font-bold text-lg'>tallymatic</h1>
            </div>
          </div>
          <LeftSidebar />
        </div>
      </div>
    </div>
  );
}
