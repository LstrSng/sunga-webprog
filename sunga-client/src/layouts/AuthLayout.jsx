import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<section className="min-h-screen bg-gradient-to-br from-fuchsia-300 via-rose-200 to-amber-200 text-zinc-900">
			<div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
				<div className="flex items-center justify-center bg-gradient-to-br from-violet-400/80 via-fuchsia-300/75 to-amber-300/75 p-8 sm:p-10 lg:p-16">
					<div className="flex w-full max-w-xl items-center justify-center p-10 sm:p-12">
						<div className="flex aspect-square w-full max-w-[24rem] flex-col items-center justify-center">
							<div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-300 text-zinc-950 shadow-sm sm:h-28 sm:w-28">
								<svg viewBox="0 0 48 48" className="h-12 w-12 sm:h-14 sm:w-14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
							<p className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">LS Studio</p>
							<p className="mt-2 text-xs uppercase tracking-[0.32em] text-zinc-500 sm:text-sm">
								Visual Stories &amp; Design
							</p>
						</div>
					</div>
				</div>

				<main className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-10 sm:px-10 lg:px-16">
					<div className="mx-auto w-full max-w-md">
						<Outlet />
					</div>
				</main>
			</div>
		</section>
	);
};

export default AuthLayout;
