import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-zinc-950 shadow-md">
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

          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-zinc-500 sm:text-lg">
              LS Studio
            </p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 sm:text-[11px]">
              Visual Stories & Design
            </p>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-1 shadow-sm">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}>
              {({ isActive }) => (
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-medium transition ${
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
      </div>
    </header>
  );
};

export default NavBar;