import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./_components/layout/MainLayout";
import HomePage from "./_pages/HomePage";
import { ROUTES } from "./routes";

const AboutPage = lazy(() => import("./_pages/About"));
const ServicesPage = lazy(() => import("./_pages/Services"));
const ProjectsList = lazy(() => import("./_pages/projects/index"));
const ProjectDetail = lazy(() => import("./_pages/projects/[slug]"));
const LearnList = lazy(() => import("./_pages/learn/index"));
const LearnArticle = lazy(() => import("./_pages/learn/[slug]"));
const ContactPage = lazy(() => import("./_pages/Contact"));
const NotFoundPage = lazy(() => import("./_pages/NotFound"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.SERVICES, element: <ServicesPage /> },
      { path: ROUTES.PROJECTS.LIST, element: <ProjectsList /> },
      { path: ROUTES.PROJECTS.DETAIL, element: <ProjectDetail /> },
      { path: ROUTES.LEARN.LIST, element: <LearnList /> },
      { path: ROUTES.LEARN.ARTICLE, element: <LearnArticle /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
