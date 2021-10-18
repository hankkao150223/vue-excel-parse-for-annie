# vue-excel-parse-for-annie

## Steps

- [ ] 1. 讀取 excel 檔案, 並轉換成 JSON (<== 這個應該有工具可以直接做掉)
- [ ] 2. 認識 JSON 資料結構, 看是否跟 excel 內容, 有對應 (比如說 第幾列 第幾欄 是否跟 JSON 內容出現的值相同)
- [ ] 3. 找尋 C 欄位中, 關鍵字 "門市專櫃:", 並記錄出現在第幾行, 並解析出 門市專櫃 後面的字串 ("2601" 與 "高雄中正門市")
- [ ] 4. 開始填入 A B 欄位 (注意: 只有在有在 C 欄位中, 有出現日期的那一列 才能填入 A B 欄位)
- [ ] 5. 輸出 excel 看結果是否正確

## 參考資料

- [sheetjs](https://github.com/SheetJS/sheetjs)
