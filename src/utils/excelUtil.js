import XLSX from 'xlsx';

export const loadExcelFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    /* Parse data */
    const ab = e.target.result;
    const wb = XLSX.read(new Uint8Array(ab), { type: 'array' });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    /* Update state */
    resolve(data);
  };
  reader.onerror = (ex) => {
    reject(ex);
  };
  reader.readAsArrayBuffer(file);
});
