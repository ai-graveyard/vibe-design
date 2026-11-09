import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { BASE_PATH } from '../data/site';

// 详情页/对比页按路由拆 chunk：prompts 数据、源码高亮、详情组件都不进首页主包
const StyleDetailPage = lazy(() =>
  import('../pages/StyleDetailPage').then((m) => ({ default: m.StyleDetailPage }))
);
const ComparePage = lazy(() =>
  import('../pages/ComparePage').then((m) => ({ default: m.ComparePage }))
);
const RecipePage = lazy(() => import('../pages/RecipePage').then(m => ({ default: m.RecipePage })));
const ProjectPage = lazy(() => import('../pages/ProjectPage').then(m => ({ default: m.ProjectPage })));
const CasesPage = lazy(() => import('../pages/CasesPage').then(m => ({ default: m.CasesPage })));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'compose', element: <Suspense fallback={null}><RecipePage /></Suspense> },
      { path: 'project', element: <Suspense fallback={null}><ProjectPage /></Suspense> },
      { path: 'cases', element: <Suspense fallback={null}><CasesPage /></Suspense> },
      {
        path: 'style/:styleId',
        element: (
          <Suspense fallback={null}>
            <StyleDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'compare/:idA/:idB',
        element: (
          <Suspense fallback={null}>
            <ComparePage />
          </Suspense>
        ),
      },
    ],
  },
], { basename: BASE_PATH.replace(/\/$/, '') });
