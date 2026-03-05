import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import DescubrePage from './pages/DescubrePage';
import EventDetailPage from './pages/EventDetailPage';
import EmpresaPage from './pages/EmpresaPage';
import ContactoPage from './pages/ContactoPage';
import TerminosPage from './pages/TerminosPage';
import PrivacidadPage from './pages/PrivacidadPage';
import CookiesPage from './pages/CookiesPage';
import SobreNosotrosPage from './pages/SobreNosotrosPage';
import TrabajaPage from './pages/TrabajaPage';
import CategoriasPage from './pages/CategoriasPage';
import CalendarioPage from './pages/CalendarioPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RegistroPage from './pages/RegistroPage';
import UserPage from './pages/UserPage';
import FavoritosPage from './pages/FavoritosPage';
import ProfilePage from './pages/ProfilePage';
import TicketDetailPage from './pages/TicketDetailPage';
import CompanyDashboardPage from './pages/CompanyDashboardPage';
import CreateEventPage from './pages/CreateEventPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
    <AppProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/descubre" element={<DescubrePage />} />
        <Route path="/evento/:id" element={<EventDetailPage />} />
        <Route path="/empresas" element={<EmpresaPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/terminos" element={<TerminosPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
        <Route path="/trabaja" element={<TrabajaPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar-contrasena" element={<ForgotPasswordPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/usuario" element={<UserPage />} />
        <Route path="/favoritos" element={<FavoritosPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/mis-tickets/:eventId" element={<TicketDetailPage />} />
        <Route path="/empresa/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/empresa/crear-evento" element={<CreateEventPage />} />
        <Route path="/empresa/editar-evento/:eventId" element={<CreateEventPage />} />
        <Route path="/carrito" element={<CheckoutPage />} />
        <Route path="/comprar/:eventId" element={<CheckoutPage />} />
      </Routes>
    </AppProvider>
    </BrowserRouter>
  );
}

export default App;
