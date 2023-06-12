<template>
  <div
    style="width: 100%;height: 100%"
    class="db-design-wrap "
  >
    <vue-good-table
      :columns="columnData"
      :rows="config.option.tableData"
      max-height="300px"
      row-style-class="rowStyle"
      compactMode
    />
  </div>
</template>
<script>
import commonMixins from 'packages/js/mixins/commonMixins'
import paramsMixins from 'packages/js/mixins/paramsMixins'
import linkageMixins from 'packages/js/mixins/linkageMixins'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
export default {
  name: 'TableChart',
  mixins: [paramsMixins, commonMixins, linkageMixins],
  props: {
    id: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  components:{VueGoodTable},
  data () {
    return {
      headerCellStyleObj: {
        backgroundColor: 'transparent'
      },
      cellStyleObj: {
        backgroundColor: 'transparent'
      },
    }
  },
  computed: {
    columnData(){
      const arr = []
     for(let item in this.config.option.columnData) {
       arr.push({
         field:item,
         label:this.config.option.columnData[item].remark || item
       })
     }
      return arr
    },
    headerCellStyle () {
      const headerBackgroundColor = {
        dark: '#141414',
        light: '#ffffff',
        auto: 'transparent'
      }
      if (document.getElementById(this.config.code)?.querySelector('tr')) {
        document
          .getElementById(this.config.code)
          .querySelector('tr').style.backgroundColor =
          this.customTheme !== 'custom'
            ? this.config.customize.headerBackgroundColor || headerBackgroundColor[this.customTheme]
            : this.headerCellStyleObj.backgroundColor
      }
      const style = {
        height: '48px',
        borderBottom: 'solid 2px #007aff',
        backgroundColor:
          this.customTheme !== 'custom'
            ? this.config.customize.headerBackgroundColor || headerBackgroundColor[this.customTheme]
            : this.headerCellStyleObj.backgroundColor,
        color:
          this.customTheme === 'light'
            ? '#000000'
            : this.config.customize.headerFontColor || '#ffffff',
        fontSize: this.config.customize.headerFontSize + 'px' || '14px'
      }
      return style
    },
    cellStyle () {
      const bodyBackgroundColor = {
        dark: '#141414',
        light: '#ffffff',
        auto: 'transparent'
      }
      const style = {
        backgroundColor:
          this.customTheme !== 'custom'
            ? this.config.customize.bodyBackgroundColor || bodyBackgroundColor[this.customTheme]
            : this.headerCellStyleObj.backgroundColor,
        color:
          this.customTheme === 'light'
            ? '#000000'
            : this.config.customize.bodyFontColor || '#ffffff',
        fontSize: this.config.customize.bodyFontSize + 'px' || '14px',
        border: `solid 1px ${this.customTheme !== 'custom'
          ? this.config.customize.bodyBackgroundColor || bodyBackgroundColor[this.customTheme]
          : this.headerCellStyleObj.backgroundColor}`
      }
      return style
    }
  },
  created () { },
  mounted () {
    if (this.customTheme === 'custom') {
      this.headerCellStyleToObj()
      this.cellStyleToObj()
    }
    if (this.customTheme === 'custom') {
      this.headerCellStyleToObj()
      this.cellStyleToObj()
    }
    if (this.config.customize.stripe) {
      const trs = document
        .getElementById(this.config.code)
        ?.querySelectorAll('tr.el-table__row--striped')
      if (trs) {
        trs.forEach(tr => {
          tr.style.opacity = '0.9'
          // 透明度
          // const overlay = document.createElement("div");
          // overlay.classList.add("overlay");
          // // 将蒙版添加到容器中
          // tr.appendChild(overlay);
        })
      }
    } else {
      const trs = document
        .getElementById(this.config.code)
        ?.querySelectorAll('tr.el-table__row--striped')
      if (trs) {
        trs.forEach(tr => {
          tr.style.opacity = '1'
          // 透明度
          // const overlay = document.createElement("div");
          // overlay.classList.add("overlay");
          // // 将蒙版添加到容器中
          // tr.appendChild(overlay);
        })
      }
      // document.querySelectorAll(".overlay").forEach(overlay => {
      //   overlay.remove();
      // });
    }
    // this.chartInit();
    if (this.config.customize.evenRowBackgroundColor && !this.config.customize.oddRowBackgroundColor) {
      // console.log(1)
      this.config.customize.oddRowBackgroundColor = this.config.customize.bodyBackgroundColor
    } else if (!this.config.customize.evenRowBackgroundColor && this.config.customize.oddRowBackgroundColor) {
      // console.log(2)
      this.config.customize.evenRowBackgroundColor = this.config.customize.bodyBackgroundColor
    } else if (!(!this.config.customize.evenRowBackgroundColor && !this.config.customize.oddRowBackgroundColor)) {
      // console.log(3)
      this.config.customize.bodyBackgroundColor = ''
    }
    window.requestAnimationFrame(() => {
      // console.log(4, this.config.customize.evenRowBackgroundColor)
      document.querySelectorAll(`.even-row${this.config.code}`).forEach(node => {
        node.style.backgroundColor = this.config.customize.evenRowBackgroundColor
      })
      // console.log(5, this.config.customize.oddRowBackgroundColor)
      document.querySelectorAll(`.odd-row${this.config.code}`).forEach(node => {
        node.style.backgroundColor = this.config.customize.oddRowBackgroundColor
      })
    })
      // this.init()
  },
  methods: {
    init(){
      this.$nextTick(() => {
        const style = document.createElement('style')
            const themeStr = 'th.ve-table-header-th{\n' +
              ' background-color: #20D944!important;\n' +
              '}'
            style.type = 'text/css'
            style.innerText = themeStr
            document.getElementsByClassName('VeTable')[0].appendChild(style)

      })
    },
    // 表格行样式
    tableRowClassName ({ row, rowIndex }) {
      // console.log(6)
      return rowIndex % 2 === 0 ? `even-row${this.config.code}` : `odd-row${this.config.code}`
    },
    buildOption (config, data) {
      config.option.tableData = data?.data
      const filteredData = {}
      const columnData = data?.columnData || {}
      if (config.dataSource.dimensionFieldList && config.dataSource.dimensionFieldList.length > 0) {
        Object?.keys(columnData).forEach(key => {
          if (
            config.dataSource.dimensionFieldList.includes(columnData[key].alias)
          ) {
            filteredData[key] = columnData[key]
          }
        })
        config.option.columnData = filteredData
      } else {
        config.option.columnData = columnData
      }
      // this.$set(this.headerCellStyleObj, "backgroundColor", config.customize.headerBackgroundColor)
      return config
    },

    // 将样式字符串转成对象, 用于自定义主题，表格头部样式
    headerCellStyleToObj () {
      const str = this.themeJson.themeCss
      // 匹配包含header-cell-style的样式字符串
      // 匹配包含header-cell-style的样式字符串
      const regex = /\.header-cell-style\{([^{}]+)\}/
      const match = str.match(regex)
      if (match) {
        // 将样式字符串转成对象
        const styleStr = match[1].trim().replace(/\s*;\s*$/, '') // 去掉末尾的空格和分号
        // const styleObj = {};
        styleStr.split(';').forEach(s => {
          const [key, value] = s.split(':')
          if (key && value) {
            // 判断是否为空字符串
            this.headerCellStyleObj[key.trim()] = value.trim()
          }
        })
      } else {
        this.headerCellStyleObj = {}
      }
    },
    // 将样式字符串转成对象, 用于自定义主题，表格主体样式
    cellStyleToObj () {
      const str = this.themeJson.themeCss
      // 匹配包含header-cell-style的样式字符串
      // 匹配包含header-cell-style的样式字符串
      const regex = /\.cell-style\{([^{}]+)\}/
      const match = str.match(regex)

      if (match) {
        // 将样式字符串转成对象
        const styleStr = match[1].trim().replace(/\s*;\s*$/, '') // 去掉末尾的空格和分号
        styleStr.split(';').forEach(s => {
          const [key, value] = s.split(':')
          if (key && value) {
            // 判断是否为空字符串
            this.cellStyleObj[key.trim()] = value.trim()
          }
        })
      } else {
        this.cellStyleObj = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.db-design-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 4px;
  box-sizing: border-box;
}

::v-deep .el-table {
  height: 100%;
  background-color: transparent;
}
::v-deep .el-table tr {
  background-color: transparent;
}

// ::v-deep .el-table th.gutter {
//   border-bottom: 2px solid var(--db-el-color-primary) !important;
// }
::v-deep .el-table__body {
  height: 100%;
}

::v-deep .el-table .el-table__header tr {
  background-color: transparent;
}

::v-deep tr.el-table__row--striped {
  z-index: 1;
  /*将容器的 z-index 设为 1，以便其在蒙版之上*/
  position: relative;
  /*设置容器为相对定位*/
  opacity: 0.9;
}

::v-deep tr.el-table__row--striped::before {
  position: absolute;
  /*设置蒙版为绝对定位*/
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  /*设置半透明的灰色背景色*/
  z-index: 2;
  /*将蒙版的 z-index 设为 2，以便其覆盖在容器之上*/
}

::v-deep .overlay {
  position: absolute;
  /*设置蒙版为绝对定位*/
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2) !important;
  /*设置半透明的灰色背景色*/
  z-index: 2;
  /*将蒙版的 z-index 设为 2，以便其覆盖在容器之上*/
}

::v-deep .cell.el-tooltip {
  z-index: 3;
  min-width: 50px;
  white-space: nowrap;
  position: inherit;
}

::v-deep .el-table {
  .el-table__cell {
    border-bottom: none !important;
  }

  &:before {
    display: none !important;
  }

  th.gutter,
  colgroup.gutter {
    width: 0px !important; //此处的宽度值，对应你自定义滚动条的宽度即可
  }
}

// 关键css代码
::v-deep .el-table__header colgroup col[name="gutter"] {
  display: table-cell !important;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px; // 横向滚动条
  height: 10px; // 纵向滚动条 必写
  background-color: transparent;
}

// 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #9093994D;
  border-radius: 5px;

  &:hover {
    background-color: #90939980;
  }
}
.rowStyle{
  height: 30px!important;
  color: red;
}
/deep/th{
  border: none!important;
}
/deep/td{
  border: none!important;
}
</style>
