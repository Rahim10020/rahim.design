import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./_components/layout/MainLayout";
import HomePage from "./_pages/HomePage";
import AboutPage from "./_pages/AboutPage";
import ContactPage from "./_pages/ContactPage";
import ProjectsList from "./_pages/projects/index";
import ProjectDetail from "./_pages/projects/[slug]";
import LearnList from "./_pages/learn/index";
import LearnArticle from "./_pages/learn/[slug]";
import { ROUTES } from "./routes";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.PROJECTS.LIST, element: <ProjectsList /> },
      { path: ROUTES.PROJECTS.DETAIL, element: <ProjectDetail /> },
      { path: ROUTES.LEARN.LIST, element: <LearnList /> },
      { path: ROUTES.LEARN.ARTICLE, element: <LearnArticle /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
