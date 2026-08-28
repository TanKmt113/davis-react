import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Page404 from './components/404/Page404';
import BlogDetails from './components/Blog/BlogDetails';
import CvPage from './pages/CvPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminAbout from './pages/admin/AdminAbout';
import AdminSkills from './pages/admin/AdminSkills';
import AdminServices from './pages/admin/AdminServices';
import AdminProjects from './pages/admin/AdminProjects';
import AdminContact from './pages/admin/AdminContact';
import AdminSocial from './pages/admin/AdminSocial';
import AdminSeo from './pages/admin/AdminSeo';
import AdminCv from './pages/admin/AdminCv';
import AdminLayout from './components/Admin/AdminLayout';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BrandingProvider } from './context/BrandingContext';
import { useWow } from './hooks/useWow';
import 'animate.css/animate.min.css';

function App() {
  useWow();

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrandingProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/cv" element={<CvPage />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blog/blog-details" element={<BlogDetails />} />
              <Route path="*" element={<Page404 />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="hero" element={<AdminHero />} />
                <Route path="about" element={<AdminAbout />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="contact" element={<AdminContact />} />
                <Route path="social" element={<AdminSocial />} />
                <Route path="seo" element={<AdminSeo />} />
                <Route path="cv" element={<AdminCv />} />
              </Route>
            </Route>
          </Routes>
          </BrowserRouter>
        </BrandingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
