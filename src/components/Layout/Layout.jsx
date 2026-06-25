import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? <Preloader /> : (
        <div className="relative min-h-screen bg-bg-deep text-text-primary overflow-x-hidden">
          {/* Fixed Background Blobs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] animate-float-1" />
            <div className="absolute bottom-[100px] right-[-50px] w-[450px] h-[450px] rounded-full bg-accent-purple/15 blur-[120px] animate-float-2" />
            <div className="absolute top-[35%] left-[35%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] animate-float-3" />
          </div>
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
