# vue-excel-parse-for-annie

[Demo site](https://hankkao150223.github.io/vue-excel-parse-for-annie/)

## TODO

- [ ] 更改輸出的檔案名稱
- [ ] 拖拉進去 直接 export file

### 待討論

- 為了避免改壞 excel (他有些 格子有 border 跟日期格式)
  - 我覺得用複製 貼上的方式作業比較方便

## Steps

- [x] 1. 讀取 excel 檔案, 並轉換成 JSON (<== 這個應該有工具可以直接做掉)
- [x] 2. 認識 JSON 資料結構, 看是否跟 excel 內容, 有對應 (比如說 第幾列 第幾欄 是否跟 JSON 內容出現的值相同)
- [x] 3. 找尋 C 欄位中, 關鍵字 "門市專櫃:", 並記錄出現在第幾行, 並解析出 門市專櫃 後面的字串 ("2601" 與 "高雄中正門市")
  - 資料結構: { A 欄位, B 欄位, startRow, count }
- [x] 4. 開始填入 A B 欄位 (注意: 只有在有在 C 欄位中, 有出現日期的那一列 才能填入 A B 欄位)
- [x] 5. 輸出 excel 看結果是否正確
  - 方法: 不一定要輸出, 可以直接改用 複製貼上的

### 額外功能

注意: 額外功能 要先等上面的 steps 都做完

- [ ] vue-element-admin
  - 使用基礎樣版 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
  - 直接從裡面去學習, 他應該是引用 element-ui
- [ ] input 美化
  - [vue-upload-component](https://github.com/lian-yue/vue-upload-component)
  - 或是使用 Quasar or Vuetify 重量級的 UI Framework
    - 應該只會用到 Title 跟 ListView
- [ ] PWA Notify, 跳出通知, 轉換完成, 開始下載...

## Install dependencies

- [xlsx](https://github.com/SheetJS/sheetjs)

## 參考資料

- [sheetjs](https://github.com/SheetJS/sheetjs)
