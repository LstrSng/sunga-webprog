import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Card, CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "First name",
    width: 130,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 130,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 80,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 180,
    valueGetter: (_value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
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

function DashboardPage() {
  const averageAge = (
    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
    rows.filter((row) => row.age !== null).length
  ).toFixed(1);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Card sx={{ minWidth: 140 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Total Users
            </Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 140 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Average Age
            </Typography>
            <Typography variant="h4">{averageAge}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: "column", xl: "row" }} spacing={3} alignItems="stretch">
        <Paper sx={{ flex: 1, p: 2 }} elevation={1}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: "Series 1", color: "#3f51f5" },
              { data: [51, 6, 49, 30], label: "Series 2", color: "#ffb300" },
            ]}
            height={300}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band", label: "Quarters" }]}
          />
        </Paper>

        <Paper sx={{ width: { xs: "100%", xl: 300 }, p: 2 }} elevation={1}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Series A", color: "#3f51f5" },
                  { id: 1, value: 15, label: "Series B", color: "#ffb300" },
                  { id: 2, value: 20, label: "Series C", color: "#ff5252" },
                ],
                outerRadius: 90,
              },
            ]}
            width={260}
            height={300}
          />
        </Paper>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>

      <Box sx={{ height: 380, width: "100%" }}>
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
        />
      </Box>
    </Stack>
  );
}

export default DashboardPage;