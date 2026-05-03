import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "id", headerName: "ID", width: 80 },
	{
		field: "firstName",
		headerName: "First name",
		flex: 1,
		minWidth: 140,
		editable: true,
	},
	{
		field: "lastName",
		headerName: "Last name",
		flex: 1,
		minWidth: 140,
		editable: true,
	},
	{
		field: "age",
		headerName: "Age",
		type: "number",
		width: 90,
		editable: true,
	},
	{
		field: "fullName",
		headerName: "Full name",
		sortable: false,
		flex: 1,
		minWidth: 180,
		valueGetter: (_value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
	},
];

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const DashboardPage = () => {
	const usersWithAge = rows.filter((row) => row.age !== null);
	const averageAge = (
		usersWithAge.reduce((sum, row) => sum + row.age, 0) / usersWithAge.length
	).toFixed(1);

	return (
		<Box sx={{ width: "100%", maxWidth: "100%", minWidth: 0, textAlign: "left" }}>
			<Stack spacing={3}>
				<Box>
					<Typography variant="h4" sx={{ mb: 0.5, fontWeight: 600, letterSpacing: 0 }}>
						Dashboard
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Overview and summary using the original dashboard sample users.
					</Typography>
				</Box>

				<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
					<Card variant="outlined" sx={{ minWidth: 160 }}>
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								Total Users
							</Typography>
							<Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: 0 }}>
								{rows.length}
							</Typography>
						</CardContent>
					</Card>

					<Card variant="outlined" sx={{ minWidth: 160 }}>
						<CardContent>
							<Typography variant="body2" color="text.secondary">
								Average Age
							</Typography>
							<Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: 0 }}>
								{averageAge}
							</Typography>
						</CardContent>
					</Card>
				</Stack>

				<Stack direction={{ xs: "column", xl: "row" }} spacing={3} alignItems="stretch">
					<Paper sx={{ flex: 1, p: { xs: 2, md: 3 }, minWidth: 0 }} variant="outlined">
						<Typography variant="h6" sx={{ fontWeight: 600 }}>
							User Growth Trend
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							Sample active and new user movement over six months.
						</Typography>
						<LineChart
							series={[
								{
									data: [12, 18, 15, 24, 28, 31],
									label: "Active Users",
									color: "#3f51f5",
									curve: "monotoneX",
								},
								{
									data: [8, 10, 14, 19, 21, 27],
									label: "New Users",
									color: "#ffb300",
									curve: "monotoneX",
								},
							]}
							height={320}
							margin={{ top: 40, right: 24, bottom: 48, left: 44 }}
							xAxis={[
								{
									data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
									scaleType: "point",
									label: "Month",
								},
							]}
						/>
					</Paper>

					<Paper sx={{ width: { xs: "100%", xl: 340 }, p: { xs: 2, md: 3 } }} variant="outlined">
						<Typography variant="h6" sx={{ fontWeight: 600 }}>
							User Segments
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							Sample segment distribution.
						</Typography>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<PieChart
								series={[
									{
										data: [
											{ id: 0, value: 24, label: "Design", color: "#7c4dff" },
											{ id: 1, value: 18, label: "Marketing", color: "#ffb300" },
											{ id: 2, value: 12, label: "Support", color: "#26a69a" },
										],
										innerRadius: 45,
										outerRadius: 90,
										paddingAngle: 3,
										cornerRadius: 4,
									},
								]}
								width={280}
								height={260}
							/>
						</Box>
					</Paper>
				</Stack>

				<Paper sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }} variant="outlined">
					<Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
						Users Overview
					</Typography>
					<Box sx={{ height: 390, width: "100%", minWidth: 0 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: 5,
									},
								},
							}}
							pageSizeOptions={[5]}
							checkboxSelection
							disableRowSelectionOnClick
							sx={{
								"& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
									outline: "none",
								},
							}}
						/>
					</Box>
				</Paper>
			</Stack>
		</Box>
	);
};

export default DashboardPage;
