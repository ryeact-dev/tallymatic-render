import { Suspense, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '@/setup/routes';
import { headerStore } from '@/store';
import { Page404 } from '@/setup/routes/index';
import LoadingSpinner from '@/common/spinner/LoadingSpinner';
import Header from '@/common/header/Header';
import ModalContainer from './ModalContainer';
import Footer from '@/common/footer/Footer';

function Layout() {
  const mainContentRef = useRef(null);
  const pageTitle = headerStore((state) => state.pageTitle);

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [pageTitle]);

  return (
    <main
      className='min-h-screen flex flex-col justify-between w-full'
      // className='overflow-auto h-full max-h-[calc(100vh)] scrollbar force-overflow'
      // id='scroll-bar-design'
      ref={mainContentRef}
    >
      <div>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}

            {/* Redirecting unknown url to 404 page */}
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Suspense>
        <ModalContainer />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default Layout;
