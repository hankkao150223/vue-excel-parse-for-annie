import XLSX from 'xlsx';

const makeCols = (refstr) => Array(XLSX.utils.decode_range(refstr).e.c + 1)
  .fill(0)
  .map((x, i) => ({ name: XLSX.utils.encode_col(i), key: i }));

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
    const cols = makeCols(ws['!ref']);
    /* Update state */
    resolve({ data, cols });
  };
  reader.onerror = (ex) => {
    reject(ex);
  };
  reader.readAsArrayBuffer(file);
});
