import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <section className='bg-white dark:bg-black text-black scroll-theme-2 overflow-x-hidden'>
      <Navbar />
      <main className='mt-20 max-w-[1280px] mx-auto px-6'>{children}</main>
      <Footer />
    </section>
  );
};

export default MainLayout;
