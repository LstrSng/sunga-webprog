import Box from "@mui/material/Box";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "firstName", headerName: "First name", width: 140 },
	{ field: "lastName", headerName: "Last name", width: 140 },
	{ field: "age", headerName: "Age", type: "number", width: 80 },
	{
		field: "fullName",
		headerName: "Full name",
		width: 180,
		sortable: false,
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

function UserPage() {
	return (
		<Stack spacing={3}>
			<div>
				<Typography variant="h4" gutterBottom>
					Users
				</Typography>
				<Typography color="text.secondary">
					Create the user details view with the MUI sample table data.
				</Typography>
			</div>

			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Users List
					</Typography>
					<Box sx={{ height: 460, width: "100%" }}>
						<DataGrid
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { pageSize: 5 },
								},
							}}
							pageSizeOptions={[5, 10]}
							checkboxSelection
							disableRowSelectionOnClick
						/>
					</Box>
				</CardContent>
			</Card>
		</Stack>
	);
}

export default UserPage;
