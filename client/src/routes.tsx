import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner } from "./components";
import { Home } from "./pages";

const lazyLoadedData = [
  {
    PageName: lazy(() => import("./pages/Project/Project")),
    path: "/project",
  },
  {
    PageName: lazy(() => import("./pages/NotFound/NotFound")),
    path: "*",
  },
];

const LazyLoadedPages = lazyLoadedData.map(({ PageName, path }, index) => {
  const page = (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <PageName />
    </Suspense>
  );

  return <Route element={page} path={path} key={index} />;
});

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      {LazyLoadedPages}
    </Routes>
  );
};

export default AppRoutes;
