<template>
  <div class="excelParse">
    <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
      <div class="row">
        <div class="col-xs-12">
          <form class="form-inline">
            <div class="form-group">
              <label for="file">Spreadsheet</label>
              <input
                id="file"
                type="file"
                class="form-control"
                :accept="SheetJSFT"
                @change="_change"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success" :disabled="data.length ? false : true" @click="_export">
            Export
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th v-for="c in cols" :key="c.key">{{ c.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, key) in data" :key="key">
                  <td v-for="c in cols" :key="c.key">{{ r[c.key] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import XLSX from 'xlsx';
import { loadExcelFile } from '@/utils/excelUtil';
import { parseExcelContent } from '@/helpers/excelParse';

const _SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm',
]
  .map((x) => `.${x}`)
  .join(',');

export default {
  name: 'ExcelParse',
  data() {
    return {
      data: ['SheetJS'.split(''), '1234567'.split('')],
      cols: [
        { name: 'A', key: 0 },
        { name: 'B', key: 1 },
        { name: 'C', key: 2 },
        { name: 'D', key: 3 },
        { name: 'E', key: 4 },
        { name: 'F', key: 5 },
        { name: 'G', key: 6 },
      ],
      SheetJSFT: _SheetJSFT,
    };
  },
  methods: {
    _suppress(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },
    _drop(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      const { files } = evt.dataTransfer;
      if (files && files[0]) this._file(files[0]);
    },
    _change(evt) {
      const { files } = evt.target;
      if (files && files[0]) this._file(files[0]);
    },
    _export() {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'sheet');
      /* generate file and send to client */
      XLSX.writeFile(wb, 'sheet.xlsx');
    },
    _file(file) {
      /* Boilerplate to set up FileReader */
      loadExcelFile(file).then((data) => {
        const newData = parseExcelContent(data);
        console.log(newData);
        this.data = newData;
      });
    },
  },
};
</script>
