import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './_components/layout/MainLayout';
import HomePage from './_pages/HomePage';
import AboutPage from './_pages/AboutPage';
import ContactPage from './_pages/ContactPage';
import ProjectsList from './_pages/projects/index';
import ProjectDetail from './_pages/projects/[slug]';
import LearnList from './_pages/learn/index';
import LearnArticle from './_pages/learn/[slug]';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'projects', element: <ProjectsList /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: 'learn', element: <LearnList /> },
      { path: 'learn/:slug', element: <LearnArticle /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
