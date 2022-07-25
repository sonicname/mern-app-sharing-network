import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Loading from "./components/Loading";
import { GlobalProvider } from "./contexts/global/globalContext";

const HomePage = lazy(() => import("./pages/HomePage"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <GlobalProvider>
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-black bg-opacity-70">
            <Loading padding={3} />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <ToastContainer />
    </GlobalProvider>
  </>
);
