import { NavLink } from 'react-router-dom';
import Button from './Button';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-white/85 shadow-sm shadow-zinc-950/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-amber-300 shadow-md shadow-zinc-950/10">
            <svg
              viewBox="0 0 48 48"
              className="h-7 w-7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 30C12 21.1634 19.1634 14 28 14H36V22H28C23.5817 22 20 25.5817 20 30C20 34.4183 23.5817 38 28 38H36"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30 10H36V16"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="min-w-0 leading-tight">
            <p className="text-base font-bold tracking-tight text-zinc-950 sm:text-lg">
              LS Studio
            </p>
            <p className="truncate text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-[11px]">
              Visual Stories & Design
            </p>
          </div>
        </NavLink>

        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto rounded-full border border-zinc-200 bg-zinc-50 p-1 shadow-sm lg:order-none lg:w-auto">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}>
              {({ isActive }) => (
                <span
                  className={`inline-flex whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-600 hover:bg-white hover:text-zinc-950'
                  }`}
                >
                  {link.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button to="/auth/signin" variant="ghost" className="px-4 py-2 text-[10px] tracking-[0.16em]">
            Sign In
          </Button>
          <Button to="/auth/signup" variant="primary" className="px-4 py-2 text-[10px] tracking-[0.16em]">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
