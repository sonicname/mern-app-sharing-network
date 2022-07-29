import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { GlobalProvider } from "./contexts/global";
import { AuthProvider } from "./contexts/auth";
import React from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <GlobalProvider>
        <AuthProvider>
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
        </AuthProvider>
      </GlobalProvider>
    </>
  </React.StrictMode>
);
