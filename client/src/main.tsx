import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { StrictMode } from "react";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";

import Loading from "./components/Loading";
import { GlobalProvider } from "./contexts/global";
import { AuthProvider } from "./contexts/auth";
import ProtectedPage from "./pages/ProtectedPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
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
            <AuthProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedPage>
                      <ProfilePage />
                    </ProtectedPage>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedPage>
                      <UploadPage />
                    </ProtectedPage>
                  }
                />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </Suspense>
        <ToastContainer
          pauseOnHover={false}
          newestOnTop={true}
          limit={4}
          draggable={true}
          draggablePercent={60}
        />
      </GlobalProvider>
    </>
  </StrictMode>
);
