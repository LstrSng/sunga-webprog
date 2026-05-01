import { Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

const monthlyData = [18, 24, 21, 28, 32, 38, 35, 42, 40, 47, 51, 56];
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const quarterlyData = [35, 44, 24, 34];
const comparisonData = [51, 6, 49, 30];

function ReportsPage() {
	return (
		<Stack spacing={3}>
			<div>
				<Typography variant="h4" gutterBottom>
					Reports
				</Typography>
				<Typography color="text.secondary">
					Track monthly growth, performance trends, and summary insights.
				</Typography>
			</div>

			<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
				<Card sx={{ flex: 1 }}>
					<CardContent>
						<Typography variant="subtitle2" color="text.secondary">
							Monthly Revenue
						</Typography>
						<Typography variant="h4">$48.2K</Typography>
					</CardContent>
				</Card>
				<Card sx={{ flex: 1 }}>
					<CardContent>
						<Typography variant="subtitle2" color="text.secondary">
							Conversion Rate
						</Typography>
						<Typography variant="h4">12.4%</Typography>
					</CardContent>
				</Card>
				<Card sx={{ flex: 1 }}>
					<CardContent>
						<Typography variant="subtitle2" color="text.secondary">
							Active Campaigns
						</Typography>
						<Typography variant="h4">7</Typography>
					</CardContent>
				</Card>
			</Stack>

			<Stack direction={{ xs: "column", xl: "row" }} spacing={3}>
				<Paper sx={{ flex: 1, p: 2 }} elevation={1}>
					<Typography variant="h6" gutterBottom>
						Revenue Forecast
					</Typography>
					<LineChart
						height={320}
						series={[
							{ data: monthlyData, label: "Current Year", curve: "monotoneX", color: "#1976d2" },
							{ data: [14, 20, 18, 25, 29, 33, 31, 37, 35, 41, 46, 50], label: "Previous Year", curve: "monotoneX", color: "#90caf9" },
						]}
						xAxis={[{ scaleType: "point", data: monthLabels }]}
					/>
				</Paper>

				<Paper sx={{ flex: 1, p: 2 }} elevation={1}>
					<Typography variant="h6" gutterBottom>
						Regional Output
					</Typography>
					<BarChart
						height={320}
						series={[
							{ data: quarterlyData, label: "North", color: "#5c6bc0" },
							{ data: comparisonData, label: "South", color: "#ffb300" },
						]}
						xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band", label: "Quarter" }]}
					/>
				</Paper>
			</Stack>

			<Paper sx={{ p: 2, maxWidth: 420 }} elevation={1}>
				<Typography variant="h6" gutterBottom>
					Traffic Sources
				</Typography>
				<PieChart
					series={[
						{
							data: [
								{ id: 0, value: 28, label: "Organic", color: "#42a5f5" },
								{ id: 1, value: 20, label: "Ads", color: "#ab47bc" },
								{ id: 2, value: 16, label: "Referral", color: "#ff7043" },
							],
							innerRadius: 50,
							outerRadius: 95,
							paddingAngle: 3,
							cornerRadius: 4,
						},
					]}
					width={360}
					height={260}
				/>
			</Paper>
		</Stack>
	);
}

export default ReportsPage;
