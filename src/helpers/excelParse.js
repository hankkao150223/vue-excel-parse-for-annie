/* eslint-disable no-continue */

const COLUMN_A = 0;

/**
 * 製作新的 columns "門市代號"與"門市地區"
 * 找尋 關鍵字 "門市專櫃:", 並記錄出現在第幾行
 *   並解析出 門市專櫃 後面的字串 ("2601" 與 "高雄中正門市")
 * 之後開始製作新的兩列
 *   注意: 只有在有在 A 欄位中, 有出現日期的那一列 才能填入新值
 */
export const parseExcelContent = (rows) => {
  // 找尋門市資料
  const storeList = parseExcelContentStep01(rows, '門市專櫃:');
  // 先分群
  const storeGroup = parseExcelContentStep02(rows, storeList);
  // 開始搜尋 A 欄位中帶有日期的列
  const storeFillIdxList = parseExcelContentStep03(rows, storeGroup);
  return storeFillIdxList;
};

function parseExcelContentStep01(rows, storeKeyWord) {
  const storeList = [];
  rows.forEach((row, rowIdx) => {
    const hasColumnA = typeof row[COLUMN_A] === 'string';
    if (hasColumnA && row[COLUMN_A].includes(storeKeyWord)) {
      const targetText = row[COLUMN_A].replace(storeKeyWord, '');
      const targets = targetText.split(' ');
      storeList.push({
        rowIdx,
        code: targets[0], // 門市代號
        area: targets[1], // 門市地區
      });
    }
  });
  return storeList;
}

function parseExcelContentStep02(rows, storeList) {
  // 將 startRow & endRow 找到 並歸類為一組
  return storeList.map((store, idx) => {
    const { rowIdx, code, area } = store;
    const startIdx = rowIdx + 1; // 自己那列不用再算了 所以 +1
    const endIdx = (storeList.length - 1) > idx
      // 直接拿下一個 group 的上一列 當作結尾
      ? storeList[idx + 1].rowIdx - 1
      // 為最後一個 group 結尾直接用 rows 最後一列
      : rows.length - 1;
    return {
      code, area, startIdx, endIdx,
    };
  });
}

function parseExcelContentStep03(rows, storeGroup) {
  return storeGroup.map((group) => {
    const {
      code, area, startIdx, endIdx,
    } = group;
    const idxList = [];
    for (let index = startIdx; index < endIdx; index += 1) {
      const row = rows[index];
      // 分析字串是否符合日期格式
      // 參考: https://thewebdev.info/2021/03/27/how-to-check-if-a-string-is-a-date-string-with-javascript/
      const isDateText = !!Date.parse(row[COLUMN_A]);
      if (!isDateText) continue;
      idxList.push(index);
    }
    return { code, area, idxList };
  });
}
