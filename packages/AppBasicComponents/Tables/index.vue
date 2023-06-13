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
    }
  },
  created () { },
  mounted () {
    this.chartInit()
  },
  methods: {
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
