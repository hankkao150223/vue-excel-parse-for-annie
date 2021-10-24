import { parseExcelContent } from './excelParse';
import excelData from '../../mock/excelData';

describe('excelParse', () => {
  test('findColumn', () => {
    parseExcelContent(excelData);
  });
});
