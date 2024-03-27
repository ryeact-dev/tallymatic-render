import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGetAllCompetitionsByEvent } from '@/hooks/competition';

export default function SidebarSubmenu({ submenu, name, icon, currentUser }) {
  const location = useLocation();
  const eventName = currentUser?.eventName;

  // const { data: competitions = [] } = useQuery(
  //   'competitions',
  //   () => getCompetitions({ eventName }),
  //   {
  //     // refetchInterval: 1000, // refect data every 2 secs
  //     enabled: !!eventName,
  //     select: ({ data }) => {
  //       const competitions = data;
  //       return competitions;
  //     },
  //   }
  // );

  const { data: competitions = [] } = useGetAllCompetitionsByEvent(
    currentUser.eventId
  );

  // Filter the competition base on currentUser event
  let filteredSubMenu = submenu;
  if (name === 'Competitions' && currentUser.role !== 'admin') {
    if (currentUser.listOfCompetitions.length === 0) {
      filteredSubMenu = competitions?.map((item) => ({
        path: `/app/competitions/${item.id}`,
        name: `${item.number} - ${item.name}`,
      }));
    } else if (currentUser.role === 'tabulator') {
      filteredSubMenu = competitions
        ?.filter((item) => currentUser.listOfCompetitions.includes(item.name))
        .map((item) => ({
          path: `/app/competitions/${item.id}`,
          name: `${item.number} - ${item.name}`,
        }));
    } else {
      // Filter the competition menu list if active or inactive
      filteredSubMenu = competitions
        ?.filter(
          (item) =>
            currentUser.listOfCompetitions.includes(item.id) &&
            item.status === 'true'
        )
        .map((item) => ({
          path: `/app/competitions/${item.id}`,
          name: `${item.number} - ${item.name}`,
        }));
    }
  }

  // // TODO TO FIX IF THE USER IS ADMIN
  // else if (name === 'Competitions' && currentUser.role === 'admin') {
  //   filteredSubMenu = competitions
  //     ?.map((item) => ({
  //       event: item.event_name,
  //       path: `/app/competitions/${item.id}`,
  //       name: `${item.number} - ${item.name}`,
  //     }))
  //     .sort((a, b) => a.event.localeCompare(b.event));
  // }

  // Remove the Admin Page when the user is not an admin or event-manager
  if (name === 'Settings' && currentUser.eventName !== 'all') {
    filteredSubMenu = filteredSubMenu.filter(
      (item) => item.name !== 'Admins & Managers'
    );
  }

  // Close the drawer when the user click on the backdrop
  const close = () => {
    document.getElementById('drawer-toggle').click();
  };

  return (
    <div className={`py-1 flex-col bg-transparent cursor-default flex-1`}>
      {/** Route header */}
      <div className='w-full text-accent dark:text-accent font-medium flex items-center gap-1 '>
        {icon} <p className='text-base font-semibold'>{name}</p>
      </div>
      {/** Submenu list */}
      <ul className={`w-full mb-4 mt-2`}>
        {filteredSubMenu?.map((m, k) => {
          return (
            <li key={k}>
              <NavLink
                onClick={close}
                end
                to={m.path}
                className={({ isActive }) =>
                  ` ${
                    isActive
                      ? 'text-accent !font-bold'
                      : 'hover:bg-transparent hover:text-accent dark:hover:text-accent'
                  } ml-2 px-2 py-1.5 text-sm transition duration-300 ease-in-out dark:font-normal font-semibold nav-link`
                }
              >
                {m.icon} {m.name}
                {location.pathname === m.path ? (
                  <span
                    className='absolute inset-y-0 left-0 my-2 -ml-1 w-1.5 rounded-tr-sm rounded-br-sm bg-accent '
                    aria-hidden='true'
                  ></span>
                ) : null}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
