import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './_components/layout/MainLayout';
import HomePage from './_pages/HomePage';
import AboutPage from './_pages/AboutPage';
import ContactPage from './_pages/ContactPage';
import ProjectsList from './_pages/projects/index';
import ProjectDetail from './_pages/projects/[slug]';
import LearnList from './_pages/learn/index';
import LearnArticle from './_pages/learn/[slug]';
import { ROUTES } from './routes';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.about, element: <AboutPage /> },
      { path: ROUTES.contact, element: <ContactPage /> },
      { path: ROUTES.projects.list, element: <ProjectsList /> },
      { path: ROUTES.projects.detail, element: <ProjectDetail /> },
      { path: ROUTES.learn.list, element: <LearnList /> },
      { path: ROUTES.learn.article, element: <LearnArticle /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
