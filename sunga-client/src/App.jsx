import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './assets/components/Layout';
import ArticlePage from './assets/pages/ArticlePage';
import HomePage from './assets/pages/HomePage';
import AboutPage from './assets/pages/AboutPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;