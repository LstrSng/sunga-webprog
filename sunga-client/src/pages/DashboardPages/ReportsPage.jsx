import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "id", headerName: "ID", width: 90 },
	{
		field: "firstName",
		headerName: "First name",
		width: 150,
		editable: true,
	},
	{
		field: "lastName",
		headerName: "Last name",
		width: 150,
		editable: true,
	},
	{
		field: "age",
		headerName: "Age",
		type: "number",
		width: 110,
		editable: true,
	},
	{
		field: "fullName",
		headerName: "Full name",
		description: "This column has a value getter and is not sortable.",
		sortable: false,
		width: 160,
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

const summaryCards = [
	{ label: "Generated", value: "89", helper: "Last 4 months" },
	{ label: "Completed", value: "71", helper: "80% completion" },
	{ label: "Open Requests", value: "18", helper: "Awaiting action" },
];

const monthlyReports = [
	{ month: "January", generated: 18, completed: 12 },
	{ month: "February", generated: 24, completed: 19 },
	{ month: "March", generated: 20, completed: 17 },
	{ month: "April", generated: 27, completed: 23 },
];

const categoryReports = [
	{ label: "Sales", value: 14, color: "#4b55f4" },
	{ label: "Users", value: 10, color: "#f5b33d" },
	{ label: "Inventory", value: 8, color: "#ff4d5d" },
	{ label: "Finance", value: 6, color: "#20b8e8" },
];

const escapeHtml = (value) =>
	String(value ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");

const ReportsPage = () => {
	const printRef = useRef(null);

	const handlePrint = () => {
		const printWindow = window.open("", "_blank", "width=1200,height=900");

		if (!printWindow) {
			return;
		}

		const exportedAt = new Intl.DateTimeFormat("en-US", {
			dateStyle: "long",
			timeStyle: "short",
		}).format(new Date());
		const maxReportCount = Math.max(
			...monthlyReports.flatMap((item) => [item.generated, item.completed])
		);
		const categoryTotal = categoryReports.reduce((sum, item) => sum + item.value, 0);
		let currentPercent = 0;
		const categoryGradient = categoryReports
			.map((item) => {
				const start = currentPercent;
				const size = (item.value / categoryTotal) * 100;
				currentPercent += size;
				return `${item.color} ${start}% ${currentPercent}%`;
			})
			.join(", ");

		printWindow.document.write(`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Reports Summary PDF</title>
					<style>
						@page {
							size: A4;
							margin: 12mm;
						}

						* {
							box-sizing: border-box;
						}

						html {
							background: #fff;
						}

						body {
							margin: 0;
							font-family: Arial, Helvetica, sans-serif;
							background: #fff;
							color: #1f2937;
							font-size: 11px;
							line-height: 1.45;
						}

						.report-shell {
							width: 100%;
							max-width: 186mm;
							margin: 0 auto;
						}

						.report-header {
							margin-bottom: 14px;
							padding-bottom: 10px;
							border-bottom: 1px solid #cbd5e1;
						}

						.report-header h1 {
							margin: 0 0 4px;
							font-size: 22px;
							font-weight: 700;
						}

						.report-header p {
							margin: 0;
							color: #475569;
							line-height: 1.5;
						}

						.summary-grid {
							display: grid;
							grid-template-columns: repeat(3, 1fr);
							gap: 8px;
							margin-bottom: 12px;
						}

						.summary-card,
						.report-card {
							border: 1px solid #dbe3ef;
							border-radius: 6px;
							background: #fff;
						}

						.summary-card {
							padding: 10px 12px;
						}

						.summary-label,
						.summary-helper,
						.card-subtitle {
							color: #64748b;
						}

						.summary-value {
							margin: 2px 0;
							font-size: 20px;
							font-weight: 700;
						}

						.report-grid {
							display: grid;
							gap: 12px;
						}

						.report-card {
							padding: 14px;
							break-inside: avoid;
							page-break-inside: avoid;
						}

						.card-title {
							margin: 0;
							font-size: 15px;
							font-weight: 700;
						}

						.card-subtitle {
							margin: 2px 0 12px;
						}

						.bar-chart {
							display: grid;
							grid-template-columns: 34px repeat(4, 1fr);
							gap: 8px;
							height: 210px;
							padding-top: 8px;
							border-bottom: 1px solid #334155;
						}

						.axis {
							position: relative;
							border-right: 1px solid #334155;
						}

						.tick {
							position: absolute;
							right: 6px;
							color: #334155;
							font-size: 10px;
							transform: translateY(50%);
						}

						.month-group {
							display: grid;
							grid-template-columns: 1fr 1fr;
							align-items: end;
							gap: 6px;
							height: 100%;
						}

						.bar {
							border-radius: 2px 2px 0 0;
							min-height: 2px;
						}

						.generated {
							background: #4b55f4;
						}

						.completed {
							background: #f5b33d;
						}

						.month-labels {
							display: grid;
							grid-template-columns: 34px repeat(4, 1fr);
							gap: 8px;
							margin-top: 4px;
							text-align: center;
							color: #334155;
						}

						.legend {
							display: flex;
							gap: 14px;
							justify-content: flex-end;
							margin-bottom: 8px;
						}

						.legend-item {
							display: inline-flex;
							align-items: center;
							gap: 5px;
						}

						.legend-swatch {
							width: 10px;
							height: 10px;
							border-radius: 2px;
						}

						.two-column {
							display: grid;
							grid-template-columns: 1fr 1fr;
							gap: 12px;
						}

						.pie-wrap,
						.gauge-wrap {
							display: flex;
							align-items: center;
							justify-content: center;
							min-height: 150px;
						}

						.pie {
							width: 126px;
							height: 126px;
							border-radius: 50%;
							background: conic-gradient(${categoryGradient});
							border: 1px solid #e2e8f0;
						}

						.gauge {
							width: 136px;
							height: 136px;
							border-radius: 50%;
							background: conic-gradient(#2e7d32 0 78%, #e2e8f0 78% 100%);
							display: grid;
							place-items: center;
						}

						.gauge-inner {
							width: 92px;
							height: 92px;
							border-radius: 50%;
							background: #fff;
							display: grid;
							place-items: center;
							font-size: 22px;
							font-weight: 700;
						}

						table {
							width: 100%;
							border-collapse: collapse;
							font-size: 10px;
						}

						th,
						td {
							padding: 6px;
							border-bottom: 1px solid #e2e8f0;
							text-align: left;
						}

						th {
							background: #f8fafc;
							color: #334155;
							font-weight: 700;
						}

						@media print {
							body {
								-webkit-print-color-adjust: exact;
								print-color-adjust: exact;
							}
						}
					</style>
				</head>
				<body>
					<main class="report-shell">
						<header class="report-header">
							<h1>Reports Summary</h1>
							<p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
							<p>Prepared on ${exportedAt}</p>
						</header>
						<section class="summary-grid">
							${summaryCards
								.map(
									(item) => `
										<div class="summary-card">
											<div class="summary-label">${escapeHtml(item.label)}</div>
											<div class="summary-value">${escapeHtml(item.value)}</div>
											<div class="summary-helper">${escapeHtml(item.helper)}</div>
										</div>
									`
								)
								.join("")}
						</section>
						<section class="report-grid">
							<div class="report-card">
								<h2 class="card-title">Monthly Report Output</h2>
								<p class="card-subtitle">Generated and completed reports across the last four months.</p>
								<div class="legend">
									<span class="legend-item"><span class="legend-swatch generated"></span>Generated</span>
									<span class="legend-item"><span class="legend-swatch completed"></span>Completed</span>
								</div>
								<div class="bar-chart">
									<div class="axis">
										<span class="tick" style="bottom: 100%">30</span>
										<span class="tick" style="bottom: 66.67%">20</span>
										<span class="tick" style="bottom: 33.33%">10</span>
										<span class="tick" style="bottom: 0">0</span>
									</div>
									${monthlyReports
										.map(
											(item) => `
												<div class="month-group">
													<div class="bar generated" style="height: ${(item.generated / maxReportCount) * 100}%"></div>
													<div class="bar completed" style="height: ${(item.completed / maxReportCount) * 100}%"></div>
												</div>
											`
										)
										.join("")}
								</div>
								<div class="month-labels">
									<span></span>
									${monthlyReports.map((item) => `<span>${escapeHtml(item.month)}</span>`).join("")}
								</div>
							</div>
							<div class="two-column">
								<div class="report-card">
									<h2 class="card-title">Report Category Share</h2>
									<p class="card-subtitle">Distribution of report requests by category.</p>
									<div class="pie-wrap">
										<div class="pie" aria-hidden="true"></div>
									</div>
									<div class="legend">
										${categoryReports
											.map(
												(item) => `
													<span class="legend-item">
														<span class="legend-swatch" style="background: ${item.color}"></span>
														${escapeHtml(item.label)}
													</span>
												`
											)
											.join("")}
									</div>
								</div>
								<div class="report-card">
									<h2 class="card-title">Completion Rate</h2>
									<p class="card-subtitle">Percentage completed on time in the latest reporting cycle.</p>
									<div class="gauge-wrap">
										<div class="gauge">
											<div class="gauge-inner">78%</div>
										</div>
									</div>
								</div>
							</div>
							<div class="report-card">
								<h2 class="card-title">Report Records</h2>
								<p class="card-subtitle">Sample report records included in this reporting output.</p>
								<table>
									<thead>
										<tr>
											<th>ID</th>
											<th>First Name</th>
											<th>Last Name</th>
											<th>Age</th>
											<th>Full Name</th>
										</tr>
									</thead>
									<tbody>
										${rows
											.slice(0, 6)
											.map(
												(row) => `
													<tr>
														<td>${escapeHtml(row.id)}</td>
														<td>${escapeHtml(row.firstName)}</td>
														<td>${escapeHtml(row.lastName)}</td>
														<td>${escapeHtml(row.age)}</td>
														<td>${escapeHtml(`${row.firstName || ""} ${row.lastName || ""}`.trim())}</td>
													</tr>
												`
											)
											.join("")}
									</tbody>
								</table>
							</div>
						</section>
					</main>
				</body>
			</html>
		`);

		printWindow.document.close();
		printWindow.focus();
		printWindow.setTimeout(() => {
			printWindow.print();
		}, 300);
	};

	return (
		<Box sx={{ width: "100%", maxWidth: "100%", minWidth: 0, textAlign: "left" }}>
			<Stack
				direction={{ xs: "column", md: "row" }}
				justifyContent="space-between"
				alignItems={{ xs: "flex-start", md: "center" }}
				spacing={2}
				sx={{ mb: 3 }}
			>
				<Box sx={{ maxWidth: 760 }}>
					<Typography variant="h4" sx={{ mb: 0.5, fontWeight: 600, letterSpacing: 0 }}>
						Reports
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Report analytics overview showing generated reports,
						category breakdown, and current completion performance.
					</Typography>
				</Box>

				<Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
					<Button variant="contained" sx={{ minHeight: 40 }}>Generate</Button>
					<Button variant="outlined" onClick={handlePrint} sx={{ minHeight: 40 }}>Print PDF</Button>
					<Button variant="outlined" sx={{ minHeight: 40 }}>Filter</Button>
				</Stack>
			</Stack>

			<Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
				{summaryCards.map((item) => (
					<Card key={item.label} variant="outlined" sx={{ flex: 1 }}>
						<CardContent sx={{ py: 2 }}>
							<Typography variant="body2" color="text.secondary">
								{item.label}
							</Typography>
							<Typography variant="h4" sx={{ my: 0.5, fontWeight: 600, letterSpacing: 0 }}>
								{item.value}
							</Typography>
							<Typography variant="caption" color="text.secondary">
								{item.helper}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Stack>

			<Stack ref={printRef} spacing={3}>
				<Card variant="outlined">
					<CardContent sx={{ p: { xs: 2, md: 3 } }}>
						<Stack
							direction={{ xs: "column", md: "row" }}
							justifyContent="space-between"
							alignItems={{ xs: "flex-start", md: "center" }}
							spacing={1}
							sx={{ mb: 2 }}
						>
							<Box>
								<Typography variant="h6" sx={{ fontWeight: 600 }}>
									Monthly Report Output
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Generated and completed reports across the last four months.
								</Typography>
							</Box>
							<Chip label="Jan - Apr" size="small" />
						</Stack>
						<Box sx={{ width: "100%", minWidth: 0 }}>
							<BarChart
								series={[
									{ data: [18, 24, 20, 27], label: "Generated" },
									{ data: [12, 19, 17, 23], label: "Completed" },
								]}
								height={320}
								margin={{ top: 36, right: 24, bottom: 56, left: 48 }}
								xAxis={[
									{
										data: ["January", "February", "March", "April"],
										scaleType: "band",
										label: "Months",
									},
								]}
							/>
						</Box>
					</CardContent>
				</Card>

				<Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
					<Card variant="outlined" sx={{ flex: 1, minWidth: 0 }}>
						<CardContent sx={{ p: { xs: 2, md: 3 } }}>
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Report Category Share
							</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
								Distribution of report requests by category.
							</Typography>
							<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
								<PieChart
									series={[
										{
											data: [
												{ id: 0, value: 14, label: "Sales" },
												{ id: 1, value: 10, label: "Users" },
												{ id: 2, value: 8, label: "Inventory" },
												{ id: 3, value: 6, label: "Finance" },
											],
										},
									]}
									width={320}
									height={240}
								/>
							</Box>
						</CardContent>
					</Card>

					<Card variant="outlined" sx={{ flex: 1, minWidth: 0 }}>
						<CardContent sx={{ p: { xs: 2, md: 3 } }}>
							<Typography variant="h6" sx={{ fontWeight: 600 }}>
								Completion Rate
							</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
								Percentage completed on time in the latest reporting cycle.
							</Typography>
							<Box
								sx={{
									minHeight: 240,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Gauge width={220} height={220} value={78} text={({ value }) => `${value}%`} />
							</Box>
						</CardContent>
					</Card>
				</Stack>

				<Card variant="outlined">
					<CardContent sx={{ p: { xs: 2, md: 3 } }}>
						<Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
							Report Records
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
					</CardContent>
				</Card>
			</Stack>
		</Box>
	);
};

export default ReportsPage;
