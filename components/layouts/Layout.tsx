'use client';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Footer from '../modules/Footer/Footer';
import Header from '../modules/Header/Header';
import MobileNavbar from '../modules/MobileNavbar/MobileNavBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMedia800 = useMediaQuery(800)

  return(
    <>
      <Header />
      {children}
      {isMedia800 && <MobileNavbar />}
      <Footer />
    </>
  );
};

export default Layout;
