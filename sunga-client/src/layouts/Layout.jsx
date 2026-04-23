import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = () => {
	return (
		<div className="min-h-screen bg-zinc-100 text-zinc-900">
			<NavBar />
			<main className="px-4 pb-12 pt-28 sm:px-6 lg:px-8">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
