import { routes } from '@/setup/routes/sidebar';
import { NavLink } from 'react-router-dom';
import { modalStore } from '@/store';

import SidebarSubmenu from './SidebarSubmenu';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '@/lib/helper/globalConstantUtil';
import { Button } from '@/common/ui/button';
import { useGetCurrentUser } from '@/hooks/user';

function LeftSidebar() {
  const currentUser = useGetCurrentUser();
  const openModal = modalStore((state) => state.openModal);

  let sidebarMenus = routes;

  if (currentUser.role === 'judge') {
    sidebarMenus = sidebarMenus.filter(
      (menu) => menu.name === 'Competitions' || menu.name === 'Dashboard'
    );
  } else if (currentUser.role === 'tabulator')
    sidebarMenus = sidebarMenus.filter(
      (menu) =>
        menu.name === 'Competitions' ||
        menu.name === 'Dashboard' ||
        menu.name === 'Results'
    );
  else {
    // If not judge or tabulator then its either admin or manager
    sidebarMenus = sidebarMenus.filter((menu) => menu.name !== 'Competitions');
  }

  const logoutUser = () => {
    openModal({
      title: 'Confirmation',
      bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: {
        message: `Are you sure you want to logout?`,
        type: CONFIRMATION_MODAL_CLOSE_TYPES.LOGOUT_USER,
      },
    });
  };

  return (
    <div className='flex flex-col min-h-[calc(100vh-60px)] justify-between'>
      <div>
        <ul className='pt-2 text-base-content'>
          {currentUser.role &&
            sidebarMenus.map((route, i) => {
              return (
                <li className='' key={i}>
                  {route.submenu ? (
                    <SidebarSubmenu {...route} currentUser={currentUser} />
                  ) : (
                    <NavLink
                      end
                      to={route.path}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? 'text-accent !font-bold hover:bg-transparent py-1'
                            : 'hover:bg-transparent py-1 hover:opacity-80 '
                        } flex items-center gap-3 text-accent dark:text-accent font-semibold dark:font-medium `
                      }
                    >
                      {route.icon} {route.name}
                      {/* {location.pathname === route.path ? (
                      <span
                        className='absolute inset-y-0 right-0 w-1 rounded-tr-md rounded-br-md bg-primary '
                        aria-hidden='true'
                      ></span>
                    ) : null} */}
                    </NavLink>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      <div className='px-4 w-full'>
        <Button onClick={logoutUser} className='w-full'>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default LeftSidebar;
