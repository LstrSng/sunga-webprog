import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/userService';

const inputClasses =
	'mt-2 w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:ring-4 focus:ring-zinc-900/5';

const actionButtonClassName = 'w-full rounded-2xl py-3 text-[11px] tracking-[0.16em]';

const SignUpPage = () => {
	const navigate = useNavigate();
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		age: '',
		gender: '',
		contactNumber: '',
		address: '',
		role: 'editor',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState((current) => ({
			...current,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);
		try {
			const email = formState.email.trim().toLowerCase();
			const userToCreate = {
				...formState,
				firstName: formState.firstName.trim(),
				lastName: formState.lastName.trim(),
				email,
				age: formState.age.trim(),
				gender: formState.gender.trim(),
				contactNumber: formState.contactNumber.trim(),
				address: formState.address.trim(),
			};

			const generatedUsername =
				email.split('@')[0] ||
				`${userToCreate.firstName}${userToCreate.lastName}`.trim().toLowerCase();

			await createUser({
				...userToCreate,
				username: generatedUsername,
				type: userToCreate.role,
				isActive: true,
			});
			setSuccess('Account created successfully. Redirecting to sign in...');
			setTimeout(() => navigate('/auth/signin'), 1100);
		} catch (err) {
			if (err instanceof TypeError) {
				setError('Unable to reach the signup server. Check that the backend and Atlas are running.');
			} else {
				setError(err.message || 'Unable to create account.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<p className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
				Create Account
			</p>
			<h1 className="mt-4 text-3xl font-bold tracking-normal text-zinc-950 sm:text-4xl">Sign Up</h1>
			<p className="mt-3 text-sm leading-6 text-zinc-600">
				Create an account to access the dashboard tools.
			</p>

			<form className="mt-8 space-y-5" onSubmit={handleSubmit}>
				<div className="grid gap-5 sm:grid-cols-2">
					<div>
						<label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
							First Name
						</label>
						<input
							id="first-name"
							name="firstName"
							value={formState.firstName}
							onChange={handleChange}
							type="text"
							placeholder="First name"
							autoComplete="given-name"
							className={inputClasses}
							required
						/>
					</div>
					<div>
						<label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
							Last Name
						</label>
						<input
							id="last-name"
							name="lastName"
							value={formState.lastName}
							onChange={handleChange}
							type="text"
							placeholder="Last name"
							autoComplete="family-name"
							className={inputClasses}
							required
						/>
					</div>
				</div>

				<div className="grid gap-5 sm:grid-cols-2">
					<div>
						<label htmlFor="signup-age" className="text-sm font-medium text-zinc-700">
							Age
						</label>
						<input
							id="signup-age"
							name="age"
							value={formState.age}
							onChange={handleChange}
							type="number"
							placeholder="Age"
							className={inputClasses}
							required
						/>
					</div>
					<div>
						<label htmlFor="signup-gender" className="text-sm font-medium text-zinc-700">
							Gender
						</label>
						<select
							id="signup-gender"
							name="gender"
							value={formState.gender}
							onChange={handleChange}
							className={inputClasses}
							required
						>
							<option value="">Select gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					</div>
				</div>

				<div>
					<label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
						Email
					</label>
					<input
						id="signup-email"
						name="email"
						value={formState.email}
						onChange={handleChange}
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						className={inputClasses}
						required
					/>
				</div>

				<div>
					<label htmlFor="signup-contact" className="text-sm font-medium text-zinc-700">
						Contact Number
					</label>
					<input
						id="signup-contact"
						name="contactNumber"
						value={formState.contactNumber}
						onChange={handleChange}
						type="tel"
						placeholder="Mobile number"
						className={inputClasses}
						required
					/>
				</div>

				<div>
					<label htmlFor="signup-address" className="text-sm font-medium text-zinc-700">
						Address
					</label>
					<input
						id="signup-address"
						name="address"
						value={formState.address}
						onChange={handleChange}
						type="text"
						placeholder="Street address"
						className={inputClasses}
						required
					/>
				</div>

				<div>
					<label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
						Password
					</label>
					<input
						id="signup-password"
						name="password"
						value={formState.password}
						onChange={handleChange}
						type="password"
						placeholder="Enter a secure password"
						autoComplete="new-password"
						className={inputClasses}
						required
					/>
					<p className="mt-2 text-xs leading-5 text-zinc-500">
						Use a secure password with letters, numbers, and symbols.
					</p>
				</div>

				<Button type="submit" variant="primary" className={actionButtonClassName} disabled={loading}>
					{loading ? 'Creating...' : 'Create Account'}
				</Button>

				{error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
				{success && <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p>}

				<div className="relative py-1">
					<div className="border-t border-zinc-200" />
					<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
						Or continue with
					</span>
				</div>

				<div className="grid gap-3 pt-2 sm:grid-cols-2">
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						Sign Up with Google
					</Button>
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						Sign Up with Apple
					</Button>
				</div>
			</form>

			<div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
				Already have an account?{' '}
				<Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
					Log In
				</Link>
			</div>
		</>
	);
};

export default SignUpPage;
