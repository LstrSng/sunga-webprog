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
						Performance Overview
					</Typography>
					<LineChart
						height={320}
						series={[{ data: monthlyData, label: "Growth", curve: "monotoneX", color: "#1976d2" }]}
						xAxis={[{ scaleType: "point", data: monthLabels }]}
					/>
				</Paper>

				<Paper sx={{ flex: 1, p: 2 }} elevation={1}>
					<Typography variant="h6" gutterBottom>
						Quarterly Comparison
					</Typography>
					<BarChart
						height={320}
						series={[
							{ data: quarterlyData, label: "Series 1", color: "#3f51f5" },
							{ data: comparisonData, label: "Series 2", color: "#ffb300" },
						]}
						xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
					/>
				</Paper>
			</Stack>

			<Paper sx={{ p: 2, maxWidth: 420 }} elevation={1}>
				<Typography variant="h6" gutterBottom>
					Category Split
				</Typography>
				<PieChart
					series={[
						{
							data: [
								{ id: 0, value: 10, label: "Series A", color: "#3f51f5" },
								{ id: 1, value: 15, label: "Series B", color: "#ffb300" },
								{ id: 2, value: 20, label: "Series C", color: "#ff5252" },
							],
							outerRadius: 95,
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
