import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { GlobalProvider } from "./contexts/global";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
// @ts-ignore
const SignInPage = lazy(() => import("./pages/SignInPage"));

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
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <ToastContainer />
    </GlobalProvider>
  </>
);
