export function exportCSV(data) {
  if (!data || Object.keys(data).length === 0) {
    alert("No data to export");
    return;
  }

  const rows = [];

  // Header
  rows.push([
    "Date",
    "Total Activities",
    "Completed Activities",
    "Status",
  ].join(","));

  // Rows
  Object.entries(data).forEach(([date, day]) => {
    const activities = day.activities || {};
    const total = Object.keys(activities).length;
    const completed = Object.values(activities).filter(Boolean).length;

    let status = "Missed";
    if (total > 0 && completed === total) status = "Completed";
    else if (completed > 0) status = "Partial";

    rows.push([
      date,
      total,
      completed,
      status,
    ].join(","));
  });

  const blob = new Blob([rows.join("\n")], {
    type: "text/csv",
  });

  download(blob, "activity-report.csv");
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
