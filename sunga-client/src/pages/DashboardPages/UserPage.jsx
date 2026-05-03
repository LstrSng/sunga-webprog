import { useMemo, useState } from "react";
import {
	Alert,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Stack,
	Switch,
	TextField,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Search from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../data/user.json?raw";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];
const statuses = [
	{ value: "active", label: "Active" },
	{ value: "inactive", label: "Inactive" },
];

const blankForm = {
	firstName: "",
	lastName: "",
	age: "",
	gender: "",
	contactNumber: "",
	email: "",
	role: "editor",
	username: "",
	password: "",
	address: "",
	isActive: true,
};

const labelize = (value) => (value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "");

const loadUsers = () => {
	try {
		return {
			users: JSON.parse(usersSeed).map((user, index) => ({
				id: Number(user.id) || index + 1,
				firstName: String(user.firstName ?? "").trim(),
				lastName: String(user.lastName ?? "").trim(),
				age: String(user.age ?? "").trim(),
				gender: genders.includes(String(user.gender ?? "").trim().toLowerCase())
					? String(user.gender ?? "").trim().toLowerCase()
					: "",
				contactNumber: String(user.contactNumber ?? "").trim(),
				email: String(user.email ?? "").trim().toLowerCase(),
				role: roles.includes(String(user.role ?? "").trim().toLowerCase())
					? String(user.role ?? "").trim().toLowerCase()
					: "editor",
				username: String(user.username ?? "").trim().toLowerCase(),
				password: String(user.password ?? ""),
				address: String(user.address ?? "").trim(),
				isActive: typeof user.isActive === "boolean" ? user.isActive : true,
			})),
			error: "",
		};
	} catch {
		return {
			users: [],
			error: "Unable to read users from src/data/user.json.",
		};
	}
};

const seed = loadUsers();

const UserPage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [users, setUsers] = useState(seed.users);
	const [modal, setModal] = useState({ open: false, id: null });
	const [form, setForm] = useState(blankForm);
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [filters, setFilters] = useState({
		search: "",
		role: "",
		gender: "",
		status: "",
	});

	const filteredUsers = useMemo(() => {
		const searchValue = filters.search.trim().toLowerCase();

		return users.filter((user) => {
			const matchesSearch =
				!searchValue ||
				[
					user.firstName,
					user.lastName,
					user.email,
					user.username,
				].some((value) => String(value ?? "").toLowerCase().includes(searchValue));
			const matchesRole = !filters.role || user.role === filters.role;
			const matchesGender = !filters.gender || user.gender === filters.gender;
			const matchesStatus =
				!filters.status ||
				(filters.status === "active" ? user.isActive : !user.isActive);

			return matchesSearch && matchesRole && matchesGender && matchesStatus;
		});
	}, [filters, users]);

	const resetForm = () => {
		setForm({ ...blankForm });
		setErrors({});
	};

	const openModal = (user) => {
		setModal({ open: true, id: user?.id ?? null });
		setForm(user ? { ...blankForm, ...user } : { ...blankForm });
		setErrors({});
	};

	const closeModal = () => {
		setModal({ open: false, id: null });
		setShowPassword(false);
		resetForm();
	};

	const handleChange = (event) => {
		const target = event.target ?? event;
		const { name, value, checked, type } = target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleFilterChange = (event) => {
		const { name, value } = event.target;
		setFilters((prev) => ({ ...prev, [name]: value }));
	};

	const clearFilters = () => {
		setFilters({
			search: "",
			role: "",
			gender: "",
			status: "",
		});
	};

	const validate = () => {
		const nextErrors = {};
		const email = form.email.trim().toLowerCase();
		const username = form.username.trim().toLowerCase();

		[
			["firstName", "First name"],
			["lastName", "Last name"],
			["age", "Age"],
			["gender", "Gender"],
			["contactNumber", "Contact number"],
			["email", "Email"],
			["role", "Role"],
			["username", "Username"],
			["password", "Password"],
			["address", "Address"],
		].forEach(([key, label]) => {
			if (!String(form[key] ?? "").trim()) {
				nextErrors[key] = `${label} is required.`;
			}
		});

		if (nextErrors.email == null && !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
			nextErrors.email = "Enter a valid email address.";
		}

		if (nextErrors.age == null && !/^\d+$/.test(form.age.trim())) {
			nextErrors.age = "Age must be a number only.";
		}

		if (nextErrors.contactNumber == null && !/^\d{11}$/.test(form.contactNumber.trim())) {
			nextErrors.contactNumber = "Contact number must be 11 digits.";
		}

		if (nextErrors.password == null && form.password.length < 8) {
			nextErrors.password = "Password must be at least 8 characters.";
		}

		if (nextErrors.username == null && /\s/.test(form.username)) {
			nextErrors.username = "Username must not contain spaces.";
		}

		if (nextErrors.email == null && users.some((user) => user.id !== modal.id && user.email === email)) {
			nextErrors.email = "Email address already exists.";
		}

		if (nextErrors.username == null && users.some((user) => user.id !== modal.id && user.username === username)) {
			nextErrors.username = "Username already exists.";
		}

		return nextErrors;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const nextErrors = validate();

		if (Object.keys(nextErrors).length) {
			setErrors(nextErrors);
			return;
		}

		const nextUser = {
			firstName: form.firstName.trim(),
			lastName: form.lastName.trim(),
			age: form.age.trim(),
			gender: form.gender.trim().toLowerCase(),
			contactNumber: form.contactNumber.trim(),
			email: form.email.trim().toLowerCase(),
			role: form.role.trim().toLowerCase(),
			username: form.username.trim().toLowerCase(),
			password: form.password,
			address: form.address.trim(),
			isActive: form.isActive,
		};

		setUsers((prev) =>
			modal.id
				? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
				: [
						...prev,
						{
							id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
							...nextUser,
						},
					]
		);

		closeModal();
	};

	const toggleStatus = (id) => {
		setUsers((prev) =>
			prev.map((user) =>
				user.id === id ? { ...user, isActive: !user.isActive } : user
			)
		);
	};

	const fieldProps = (name, label, extra = {}) => ({
		name,
		label,
		value: form[name],
		onChange: handleChange,
		fullWidth: true,
		error: Boolean(errors[name]),
		helperText: errors[name],
		...extra,
	});

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.35, minWidth: 60 },
		{
			field: "fullName",
			headerName: "Full name",
			flex: 1,
			minWidth: 150,
			valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`.trim(),
		},
		{ field: "username", headerName: "Username", flex: 0.85, minWidth: 130 },
		{ field: "age", headerName: "Age", flex: 0.4, minWidth: 70 },
		{
			field: "gender",
			headerName: "Gender",
			flex: 0.55,
			minWidth: 90,
			valueGetter: (_value, row) => labelize(row.gender),
		},
		{ field: "contactNumber", headerName: "Contact Number", flex: 0.85, minWidth: 140 },
		{ field: "email", headerName: "Email", flex: 1.25, minWidth: 210 },
		{
			field: "role",
			headerName: "Role",
			flex: 0.55,
			minWidth: 90,
			valueGetter: (_value, row) => labelize(row.role),
		},
		{
			field: "status",
			headerName: "Status",
			flex: 0.6,
			minWidth: 110,
			sortable: false,
			renderCell: ({ row }) => (
				<Chip
					size="small"
					label={row.isActive ? "Active" : "Inactive"}
					color={row.isActive ? "success" : "default"}
					variant={row.isActive ? "filled" : "outlined"}
				/>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			flex: 0.95,
			minWidth: 170,
			align: "right",
			headerAlign: "right",
			sortable: false,
			filterable: false,
			renderCell: ({ row }) => (
				<Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ py: 0.5, width: "100%" }}>
					<Button size="small" variant="outlined" onClick={() => openModal(row)}>
						Edit
					</Button>
					<Button
						size="small"
						variant="contained"
						color={row.isActive ? "warning" : "success"}
						onClick={() => toggleStatus(row.id)}
					>
						{row.isActive ? "Disable" : "Activate"}
					</Button>
				</Stack>
			),
		},
	];

	return (
		<Box sx={{ width: "100%", minWidth: 0, maxWidth: "100%" }}>
			<Box
				sx={{
					mb: 3,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 2,
					flexWrap: "wrap",
				}}
			>
				<Typography variant="h4">Users</Typography>
				<Button
					variant="contained"
					onClick={() => openModal()}
					sx={{ width: { xs: "100%", sm: "auto" } }}
				>
					Add User
				</Button>
			</Box>

			{seed.error ? (
				<Alert severity="error" sx={{ mb: 2 }}>
					{seed.error}
				</Alert>
			) : null}

			<Paper sx={{ p: { xs: 1.5, sm: 2 }, width: "100%", minWidth: 0, maxWidth: "100%", overflow: "hidden" }}>
				<Stack
					direction={{ xs: "column", md: "row" }}
					spacing={2}
					sx={{ mb: 2 }}
					alignItems={{ xs: "stretch", md: "center" }}
				>
					<TextField
						name="search"
						label="Search users"
						value={filters.search}
						onChange={handleFilterChange}
						placeholder="First name, last name, email, or username"
						sx={{ flex: 1, minWidth: { md: 280 } }}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<Search fontSize="small" />
									</InputAdornment>
								),
							},
						}}
					/>

					<TextField
						name="role"
						label="Role"
						value={filters.role}
						onChange={handleFilterChange}
						select
						sx={{ minWidth: { md: 150 } }}
					>
						<MenuItem value="">All roles</MenuItem>
						{roles.map((role) => (
							<MenuItem key={role} value={role}>
								{labelize(role)}
							</MenuItem>
						))}
					</TextField>

					<TextField
						name="gender"
						label="Gender"
						value={filters.gender}
						onChange={handleFilterChange}
						select
						sx={{ minWidth: { md: 150 } }}
					>
						<MenuItem value="">All genders</MenuItem>
						{genders.map((gender) => (
							<MenuItem key={gender} value={gender}>
								{labelize(gender)}
							</MenuItem>
						))}
					</TextField>

					<TextField
						name="status"
						label="Status"
						value={filters.status}
						onChange={handleFilterChange}
						select
						sx={{ minWidth: { md: 150 } }}
					>
						<MenuItem value="">All statuses</MenuItem>
						{statuses.map((status) => (
							<MenuItem key={status.value} value={status.value}>
								{status.label}
							</MenuItem>
						))}
					</TextField>

					<Button variant="outlined" onClick={clearFilters} sx={{ minHeight: 56 }}>
						Clear
					</Button>
				</Stack>

				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					Showing {filteredUsers.length} of {users.length} users
				</Typography>

				{users.length ? (
					<Box sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0, maxWidth: "100%", overflow: "hidden" }}>
						<DataGrid
							rows={filteredUsers}
							columns={columns}
							disableRowSelectionOnClick
							pageSizeOptions={[5, 10]}
							initialState={{
								pagination: { paginationModel: { pageSize: 5, page: 0 } },
							}}
							sx={{
								width: "100%",
								minWidth: 0,
								"& .MuiDataGrid-main": {
									minWidth: 0,
								},
								"& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
									outline: "none",
								},
								"& .MuiDataGrid-cellContent": {
									overflow: "hidden",
									textOverflow: "ellipsis",
								},
							}}
						/>
					</Box>
				) : (
					<Alert severity="info">No users found. Use Add User to create your first record.</Alert>
				)}
			</Paper>

			<Dialog
				open={modal.open}
				onClose={closeModal}
				fullWidth
				fullScreen={isMobile}
				maxWidth="md"
			>
				<Box component="form" onSubmit={handleSubmit}>
					<DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>
					<DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
						<Stack spacing={2} sx={{ pt: 1 }}>
							<Stack
								direction={{ xs: "column", sm: "row" }}
								spacing={2}
								sx={{ "& > .MuiFormControl-root": { flex: 1, minWidth: 0 } }}
							>
								<TextField {...fieldProps("firstName", "First Name")} />
								<TextField {...fieldProps("lastName", "Last Name")} />
							</Stack>

							<Stack
								direction={{ xs: "column", sm: "row" }}
								spacing={2}
								sx={{ "& > .MuiFormControl-root": { flex: 1, minWidth: 0 } }}
							>
								<TextField {...fieldProps("age", "Age", { inputMode: "numeric" })} />
								<TextField {...fieldProps("gender", "Gender", { select: true })}>
									{genders.map((gender) => (
										<MenuItem key={gender} value={gender}>
											{labelize(gender)}
										</MenuItem>
									))}
								</TextField>
							</Stack>

							<Stack
								direction={{ xs: "column", sm: "row" }}
								spacing={2}
								sx={{ "& > .MuiFormControl-root": { flex: 1, minWidth: 0 } }}
							>
								<TextField {...fieldProps("contactNumber", "Contact Number", { inputMode: "numeric" })} />
								<TextField {...fieldProps("email", "Email Address", { type: "email" })} />
							</Stack>

							<Stack
								direction={{ xs: "column", sm: "row" }}
								spacing={2}
								sx={{ "& > .MuiFormControl-root": { flex: 1, minWidth: 0 } }}
							>
								<TextField {...fieldProps("role", "Role", { select: true })}>
									{roles.map((role) => (
										<MenuItem key={role} value={role}>
											{labelize(role)}
										</MenuItem>
									))}
								</TextField>
								<TextField {...fieldProps("username", "Username")} />
							</Stack>

							<TextField
								{...fieldProps("password", "Password", {
									type: showPassword ? "text" : "password",
									slotProps: {
										input: {
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														edge="end"
														onClick={() => setShowPassword((prev) => !prev)}
														onMouseDown={(event) => event.preventDefault()}
														aria-label={showPassword ? "Hide password" : "Show password"}
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										},
									},
								})}
							/>

							<TextField {...fieldProps("address", "Address", { multiline: true, rows: 3 })} />

							<FormControlLabel
								control={<Switch name="isActive" checked={form.isActive} onChange={handleChange} />}
								label={form.isActive ? "User status: Active" : "User status: Inactive"}
							/>
						</Stack>
					</DialogContent>

					<DialogActions sx={{ px: 3, py: 2 }}>
						<Button onClick={closeModal}>Cancel</Button>
						<Button type="submit" variant="contained">
							{modal.id ? "Update User" : "Save User"}
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</Box>
	);
};

export default UserPage;
