import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-500">
      <NavBar />

      <main className="flex-1 px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-200 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} LS Studio. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm text-zinc-600">
            <a href="/" className="hover:text-zinc-900">Home</a>
            <a href="/about" className="hover:text-zinc-900">About</a>
            <a href="/articles" className="hover:text-zinc-900">Articles</a>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Layout;