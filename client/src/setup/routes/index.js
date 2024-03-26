// All components mapping with path for internal routes

import { lazy } from 'react';

export const JudgesAndTabulators = lazy(() =>
  import('@/pages/protected/JudgesAndTabulators')
);
export const AdminAndManagers = lazy(() =>
  import('@/pages/protected/AdminAndManagers')
);
export const CompetitionSettings = lazy(() =>
  import('@/pages/protected/CompetitionSettings')
);
export const Competition = lazy(() => import('@/pages/protected/Scoresheet'));
export const ScoresByJudge = lazy(() =>
  import('@/pages/protected/ScoresByJudge')
);
export const ScoresByCompetition = lazy(() =>
  import('@/pages/protected/ScoresByCompetition')
);
export const SelectFinalists = lazy(() =>
  import('@/pages/protected/SelectFinalists')
);
export const MinorOverallScores = lazy(() =>
  import('@/pages/protected/MinorOverallScores')
);

export const Candidates = lazy(() => import('@/pages/protected/Candidates'));
export const Dashboard = lazy(() => import('@/pages/protected/Dashboard'));

export const WaitingPage = lazy(() => import('@/pages/protected/WaitingPage'));
export const Page404 = lazy(() => import('@/pages/protected/404'));

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/competitions/:id',
    component: Competition,
  },
  {
    path: '/results-by-judge',
    component: ScoresByJudge,
  },
  {
    path: '/results-by-competition',
    component: ScoresByCompetition,
  },
  {
    path: '/results-overallscores-minor',
    component: MinorOverallScores,
  },
  {
    path: '/settings-select-finalists',
    component: SelectFinalists,
  },
  {
    path: '/settings-competitions',
    component: CompetitionSettings,
  },
  {
    path: '/settings-contestants',
    component: Candidates,
  },
  {
    path: '/settings-judges-tabulators',
    component: JudgesAndTabulators,
  },
  {
    path: '/settings-admins-managers',
    component: AdminAndManagers,
  },

  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/waiting-page',
    component: WaitingPage,
  },
];

export default routes;
