import { useEffect } from 'react';
import About from '../components/About/About';
import Iconbox from '../components/Iconbox/Iconbox';
import Skill from '../components/Skill/Skill';
import Contact from "../components/Contact/Contact";
import PortfolioSection from '../components/Protfolio/PortfolioSection';
import Hero from '../components/Hero/Hero';
import { useSiteData } from '../hooks/useSiteData';
import { syncWow } from '../hooks/useWow';

const Home = () => {
  const { data, loading } = useSiteData();

  useEffect(() => {
    if (!loading && data) {
      syncWow();
    }
  }, [loading, data]);

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
      <About data={data.about} />
      <Skill data={data.skills} />
      <Iconbox data={{ services: data.services }} />
      <PortfolioSection portfolioItems={data.projects} isLoading={false} />
      <Contact data={data.contact} socialData={data.social} />
    </>
  );
};

export default Home;
