/**
 * 製作新的 columns "門市代號"與"門市地區"
 * 找尋 C 欄位中, 關鍵字 "門市專櫃:", 並記錄出現在第幾行
 *   並解析出 門市專櫃 後面的字串 ("2601" 與 "高雄中正門市")
 * 之後開始製作新的兩列
 *   注意: 只有在有在 A 欄位中, 有出現日期的那一列 才能填入新值
 */
export const parseExcelContent = (rows) => {
  rows.forEach((row, rowIdx) => {
    console.log(row, rowIdx);
  });
};
