import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import EventsSection from '../components/EventsSection';
import SpotlightEventSection from '../components/SpotlightEventSection';
import EnterpriseBannerSection from '../components/EnterpriseBannerSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import WelcomePopup from '../components/WelcomePopup';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <WelcomePopup />
      <Navbar transparent />
      <HeroSection />
      <CategoriesSection />
      <EventsSection />
      <SpotlightEventSection />
      <EnterpriseBannerSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
