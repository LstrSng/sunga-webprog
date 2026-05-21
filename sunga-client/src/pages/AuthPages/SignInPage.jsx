import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

const inputClasses =
	'mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5';

const actionButtonClassName = 'w-full rounded-2xl py-3 text-[11px] tracking-[0.16em]';

const SignInPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/dashboard';
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await login({ email, password });
			navigate(from, { replace: true });
		} catch (err) {
			setError(err.message || 'Login failed. Please try again.');
		}
	};
	return (
		<div className="relative lg:pt-6">
			<div className="mb-6 flex w-full justify-end lg:absolute lg:right-0 lg:top-0 lg:mb-0">
				<Link
					to="/"
					className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-900"
				>
					<span aria-hidden="true" className="text-base leading-none">←</span>
					Back to Home
				</Link>
			</div>
			<h1 className="mt-0 text-3xl font-bold tracking-normal text-zinc-950 sm:text-4xl">Log In</h1>
			<p className="mt-3 text-sm leading-6 text-zinc-600">
				Sign in to manage articles, users, and dashboard reports.
			</p>

			<form className="mt-8 space-y-5" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
						Email Address
					</label>
					<input
						id="signin-email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={inputClasses}
						required
					/>
				</div>

				<div>
					<label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
						Password
					</label>
					<input
						id="signin-password"
						type="password"
						placeholder="Enter your password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={inputClasses}
						required
					/>
					<p className="mt-2 text-xs leading-5 text-zinc-500">
						Use the password connected to your account.
					</p>
				</div>

				<div className="flex items-center justify-between gap-4 text-sm">
					<label className="flex items-center gap-2 text-zinc-600">
						<input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" />
						<span>Remember me</span>
					</label>
					<button type="button" className="font-medium text-zinc-700 transition hover:text-zinc-900">
						Forgot Password?
					</button>
				</div>

				<Button type="submit" variant="primary" className={actionButtonClassName}>
					Log In
				</Button>

				{error && (
					<div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{error}
					</div>
				)}

				<div className="relative py-4">
					<div className="border-t border-zinc-200" />
					<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
						Or continue with
					</span>
				</div>

				<div className="grid gap-3 pt-2 sm:grid-cols-2">
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						Log In with Google
					</Button>
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						Log In with Apple
					</Button>
				</div>
			</form>

			<div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
				No account yet?{' '}
				<Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default SignInPage;
