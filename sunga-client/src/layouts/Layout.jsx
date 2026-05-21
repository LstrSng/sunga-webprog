import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = () => {
	return (
		<div className="min-h-screen text-zinc-900">
			<NavBar />
			<main className="px-4 pb-14 pt-32 sm:px-6 lg:px-8">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
