import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "./api";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PostsListPage from "./pages/PostsListPage";
import PostEditPage from "./pages/PostEditPage";
import ProjectsListPage from "./pages/ProjectsListPage";
import ProjectEditPage from "./pages/ProjectEditPage";
import AdminLayout from "./components/AdminLayout";

function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    api.checkAuth()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="posts" element={<PostsListPage />} />
        <Route path="posts/new" element={<PostEditPage />} />
        <Route path="posts/:slug" element={<PostEditPage />} />
        <Route path="projects" element={<ProjectsListPage />} />
        <Route path="projects/new" element={<ProjectEditPage />} />
        <Route path="projects/:id" element={<ProjectEditPage />} />
      </Route>
    </Routes>
  );
}
