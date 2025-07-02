import { Routes, Route, Navigate } from "react-router-dom"

// Layout components
import MainLayout from "./components/layouts/MainLayout"
import AdminLayout from "./components/layouts/AdminLayout"

// Auth pages
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"

// Public pages
import HomePage from "./pages/landing/HomePage"
import AboutPage from "./pages/landing/AboutPage"
import ServicesPage from "./pages/landing/ServicesPage"
import ContactPage from "./pages/landing/ContactPage"
import InterestFormPage from "./pages/client/InterestFormPage"

// Protected pages
import DashboardPage from "./pages/client/DashboardPage"
import ProfilePage from "./pages/client/ProfilePage"
import AppointmentsPage from "./pages/client/AppointmentsPage"

// Admin pages
import AdminDashboardPage from "./pages/admin/DashboardPage"
import UsersPage from "./pages/admin/UsersPage"
import ReferralsPage from "./pages/admin/ReferralsPage"

// Counselor pages
import CounselorDashboardPage from "./pages/counselor/DashboardPage"
import ClientsPage from "./pages/counselor/ClientsPage"

// Auth guard component
import ProtectedRoute from "./components/auth/ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="interest-form" element={<InterestFormPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Client protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute roles={["client"]} />}>
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
      </Route>

      {/* Admin protected routes */}
      <Route path="/admin" element={<ProtectedRoute roles={["admin", "business-specialist"]} />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="referrals" element={<ReferralsPage />} />
        </Route>
      </Route>

      {/* Counselor protected routes */}
      <Route path="/counselor" element={<ProtectedRoute roles={["counselor"]} />}>
        <Route element={<AdminLayout />}>
          <Route index element={<CounselorDashboardPage />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
