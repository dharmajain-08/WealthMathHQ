import * as XLSX from 'xlsx';

interface ExportData {
  title: string;
  clientName: string;
  summary: { label: string; value: string }[];
  tableHeaders: string[];
  tableData: any[][];
}

export const exportToExcel = ({ title, clientName, summary, tableHeaders, tableData }: ExportData) => {
  const wb = XLSX.utils.book_new();
  
  // Create metadata rows
  const metaData = [
    ["Brand", "WealthMathHQ"],
    ["Report", title],
    ["Client Name", clientName],
    ["Date", new Date().toLocaleDateString('en-IN')],
    [],
    ["Summary"],
    ...summary.map(s => [s.label, s.value]),
    [],
    tableHeaders
  ];
  
  const ws = XLSX.utils.aoa_to_sheet([...metaData, ...tableData]);
  XLSX.utils.book_append_sheet(wb, ws, "Financial Report");
  
  XLSX.writeFile(wb, `WealthMathHQ_${title.replace(/\s+/g, '_')}.xlsx`);
};
