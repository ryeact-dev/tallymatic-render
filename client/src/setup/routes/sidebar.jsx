import { LayoutDashboard, NotebookText, Settings, Tally5 } from 'lucide-react';

const iconClasses = `h-4 w-4`;

export const routes = [
  {
    path: '/app/dashboard',
    icon: (
      <LayoutDashboard
        className={`${iconClasses} inline -mr-2`}
        strokeWidth={2}
      />
    ),
    name: 'Dashboard',
  },
  {
    path: '', //no url needed as this has submenu
    icon: <NotebookText className={`${iconClasses} inline`} strokeWidth={2} />, // icon component
    name: 'Competitions', // name that appear in Sidebar
    submenu: [],
  },
  {
    path: '',
    icon: <Tally5 className={`${iconClasses}`} strokeWidth={2} />,
    name: 'Results',
    submenu: [
      {
        path: '/app/results-by-judge',
        // icon: <UserIcon className={submenuIconClasses} />,
        name: 'Scores by Judge',
      },
      {
        path: '/app/results-by-competition',
        // icon: <UserIcon className={submenuIconClasses} />,
        name: 'Scores by Competition',
      },
      {
        path: '/app/results-overallscores-minor',
        // icon: <UserIcon className={submenuIconClasses} />,
        name: 'Overall Scores for Minor Competitions',
      },
    ],
  },
  {
    path: '',
    icon: <Settings className={`${iconClasses} inline`} strokeWidth={2} />,
    name: 'Settings',
    submenu: [
      {
        path: '/app/settings-competitions',
        name: 'Competitions',
      },
      {
        path: '/app/settings-contestants',
        name: 'Candidates',
      },
      {
        path: '/app/settings-select-finalists',
        // icon: <UserIcon className={submenuIconClasses} />,
        name: 'Select Finalists',
      },
      {
        path: '/app/settings-judges-tabulators',
        name: 'Judges & Tabulators',
      },
      {
        path: '/app/settings-admins-managers',
        name: 'Admins & Managers',
      },
      // {
      //   path: '/app/settings-team',
      //   name: 'Team Members',
      // },
    ],
  },
];
