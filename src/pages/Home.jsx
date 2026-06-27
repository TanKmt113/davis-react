import About from '../components/About/About';
import Iconbox from '../components/Iconbox/Iconbox';
import Skill from '../components/Skill/Skill';
import Contact from "../components/Contact/Contact";
import PortfolioSection from '../components/Protfolio/PortfolioSection';
import Hero from '../components/Hero/Hero';
import { useSiteData } from '../hooks/useSiteData';

const Home = () => {
  const { data, loading } = useSiteData();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Hero data={data.hero} socialData={data.social} />
      <About data={data.about} data-aos="fade-right" />
      <Skill data={data.skills} data-aos="fade-right" />
      <Iconbox data={{ services: data.services }} data-aos="fade-right" />
      <PortfolioSection portfolioItems={data.projects} isLoading={false} data-aos="fade-right" />
      <Contact data={data.contact} socialData={data.social} data-aos="fade-right" />
    </>
  );
};

export default Home;
