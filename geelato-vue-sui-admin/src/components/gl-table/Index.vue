<template>
  <div class="ui grid" v-if="opts">
    <!--查询条件-->
    <div v-if="opts.query.show" class="four wide column gl-table-query" :style="{display:(isMax?'none':'')}">
      <div v-if="opts.query.tree">
        <div class="ui borderless secondary menu gl-header">
          <div class="item">{{opts.query.tree.title}}
          </div>
          <div class="ui right secondary mini menu">
            <div class="item">
              <!--<button class="ui primary basic button">查询</button>&nbsp;-->
              <!--<button class="ui primary basic button">重置</button>-->
            </div>
          </div>
        </div>
        <div class="ui fitted divider"></div>
        <table-tree :opts="opts.query.tree" @click="clickTreeNode"></table-tree>
      </div>
      <div v-if="opts.query.filter">
        <div class="ui borderless secondary menu gl-header">
          <div class="item">{{opts.leftTitle||'查询过滤'}}
          </div>
          <div class="ui right secondary mini menu">
            <div class="item">
              <button class="ui mini basic button" :class="$gl.ui.color.primary">查询</button>&nbsp;
              <button class="ui mini basic button" :class="$gl.ui.color.primary">重置</button>
            </div>
          </div>
        </div>
        <div class="ui fitted divider"></div>
        <div class="ui filter">
          xxx
        </div>
      </div>
      <div v-if="opts.query.mix">
        <div class="ui borderless secondary menu gl-header">
          <div class="item" style="font-weight: bold">{{opts.leftTitle||'查询过滤'}}
          </div>
          <!-- 当查询条件多于8个时，才会在上方展示查询、重置按钮，这样页面简洁点，在内容较多，不便拖动时才在上方展示-->
          <div class="ui right secondary mini menu"
               v-if="opts.query.mix.fields&&opts.query.mix.fields.length>8">
            <div class="item">
              <button class="ui mini basic button" :class="$gl.ui.color.primary" @click="submit">查询
              </button>&nbsp;
              <button class="ui mini basic button" :class="$gl.ui.color.primary" @click="reset">重置
              </button>
            </div>
          </div>
        </div>
        <div class="ui fitted divider" style="margin-bottom: 0.5em"></div>
        <table-query ref="queryForm" :opts="opts.query.mix" v-model="mixQuery"
                     @input="formQueryCallback"></table-query>
      </div>
    </div>
    <!--查询列表-->
    <div :class="{ 'sixteen wide':isMax, 'twelve wide':!isMax }" class="column gl-table-main">
      <!--工具条-->
      <div class="ui borderless secondary menu gl-header">
        <a class="item gl-page-sidebar-toggle" @click="toggleSidebar">
          <i class="sidebar icon"></i>
        </a>
        <div class="item gl-title" style="font-weight: bold">{{opts.rightTitle}}
        </div>
        <div class="ui right secondary  borderless mini menu">
          <div v-if="opts.toolbar" class="item">
            <template v-for="(item, index) in opts.toolbar.actions">
              <!--有hidden属性，或hidden为空-->
              <button class="ui mini button"
                      :key="index"
                      :class="item.color?$gl.ui.color[item.color]:$gl.ui.color.primary"
                      @click="click(item,$event)"
                      v-if="!item.hasOwnProperty('hidden')||$gl.utils.isEmpty(item.hidden)||$gl.utils.eval(item.hidden)">
                {{item.title}}
              </button>&nbsp;
            </template>
          </div>
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui info message" v-if="showTips&&opts.tips&&opts.tips.html">
        <i class="close icon" @click="showTips=false"></i>
        <div v-html="opts.tips.html"></div>
      </div>
      <!--结果列表-->
      <table class="ui selectable compact table gl-compact">
        <thead>
        <tr>
          <th style="width: 1em" v-if="opts.mode!=='select'">
            <div class="ui master checkbox">
              <input type="checkbox">
              <label></label>
            </div>
          </th>
          <th style="width:5em">操作</th>
          <th v-for="(item, index) in opts.table.columns" :key="index" v-if="item.visible!==false"
              :style="{width:item.width}">
            {{item.title}}
          </th>
        </tr>
        </thead>
        <tbody v-if="queryResult.data&&queryResult.data.length>0">
        <tr v-for="(rowDataItem,rowIndex) in queryResult.data" :key="rowIndex">
          <td v-if="opts.mode!=='select'">
            <div class="ui child checkbox">
              <input type="checkbox" :data-rowId="rowDataItem[opts.table.select.field]">
              <label></label>
            </div>
          </td>
          <td>
            <div v-if="opts.mode==='select'">
              <div class="ui mini buttons" :class="$gl.ui.color.primary">
                <div class="ui button" @click="selectRow(rowDataItem)">选择</div>
              </div>
            </div>
            <div v-if="opts.mode!=='select'" class="ui mini buttons" :class="$gl.ui.color.primary">
              <div class="ui button"
                   v-if="opts.table.dropdown.actions.length===1?item=opts.table.dropdown.actions[0]:''"
                   @click="click(item,$event,rowDataItem)">{{item.title}}
              </div>
              <!--<div class="ui button" style="padding-left: 0.9em;padding-right: 0.5em"></div>-->
              <div class="ui floating dropdown icon button"
                   v-else-if="opts.table.dropdown.actions.length>1">
                <i class="dropdown icon"></i>
                <div class="menu">
                  <template v-for="(item, index) in opts.table.dropdown.actions">
                    <div class="item" :key="index" @click="click(item,$event,rowDataItem)"
                         v-if="eval(item.visible,rowDataItem)!==true">
                      {{item.title}}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </td>
          <!--展示列数据 visible el:表达式  format：格式化-->
          <td v-for="(item, index) in opts.table.columns" :key="index" v-if="item.visible!==false"
              :style="{'text-align':item.textAlign}">
            <template v-if="item.el">
              {{$gl.utils.eval(item.el,rowDataItem)}}
            </template>
            <template v-else>
              {{ rowDataItem[item.field]}}
            </template>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td class="warning" :colspan="opts.table.columns.length+1"
              style="text-align: center;height: 2.6em">没有记录
          </td>
        </tr>
        </tbody>
      </table>
      <div class="ui info message" v-if="showTips&&opts.tips&&opts.tips.display==='bottom'">
        <i class="close icon" @click="showTips=false"></i>
        <div v-html="opts.tips.html"></div>
      </div>
      <div class="gl-table-info">
        <!--{{opts.info}}-->
      </div>
      <div class="gl-table-stat">
        <!--{{opts.stat}}-->
      </div>
      <!--分页-->
      <gl-pagination v-show="queryResult.data&&queryResult.data.length>0" class="center" ref="pagination"
                     :total="parseInt(queryResult.total)"
                     :current="parseInt(queryResult.page)"
                     :showSize="pagination.showSize"
                     :showSizeChanger="true"
                     @showSizeChange="showSizeChange"
                     @navPage="navPage"></gl-pagination>
    </div>
  </div>
</template>
<script>
  /* no-case-declarations */
  import utils from '../../assets/script/utils'
  import TableQuery from './TableQuery.vue'
  import TableTree from './TableTree.vue'
  import GlPagination from '../gl-pagination/Index.vue'

  export default {
    props: {
      opts: {
        type: Object,
        required: true
      },
      query: {
        type: Object
      },
      opener: {
        type: Object,
        required: false
      },
      modal: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        // opener: {},
        // 最大时，不展示查询区
        isMax: false,
        // 关闭tips
        showTips: true,
        // 查询的结果数据
        queryResult: {},
        // 通过formQueryMethodInfo的变化，来驱动调用query组件的相应方法
        formQueryMethodInfo: {method: '', args: ''},
        mixQuery: {},
        columns: [],
        visibleColumns: [],
        selectedRows: [],
        // 点击action,选中的row
        clickRow: {},
        checkedIds: [],
        currentTreeNode: {id: ''},
        lastGql: {},
        pagination: {
          // total: 0,
          // 第几页，从1开始。
          pageNum: 1,
          showSize: 0
        },
        // 是否重新查询，是的话，重置pagination，再进行查询
        needResetPagination: false
      }
    },
    created() {
      console.log('gl-table > Index>  opts: ', this.opts)
      console.log('gl-table > Index> ooo: ', this.ooo)
    },
    mounted() {
      this.resetPagination()
      this.loadData()
//      $(this.$el).find('.ui.cards')()
//      $(this.$el).find('.ui.checkbox').checkbox()
    },
    updated() {
      $(this.$el).find('.ui.dropdown').dropdown()
      this.initCheckbox()
    },
    methods: {
      self() {
        return this
      },
      loadData() {
        let thisVue = this
        this.$gl.data.queryByGql(genGql(this.lastMixQueryData)).then(function (data) {
          thisVue.queryResult = data
        })

        // 构建列表查询gql
        function genGql(queryData) {
          let root = {}
          if (queryData) {
            for (let i in queryData) {
              root[i] = queryData[i]
            }
          }
          let fsAry = []
          for (let i in thisVue.opts.table.columns) {
            let col = thisVue.opts.table.columns[i]
            // 过滤掉空列，或计算列
            if (!thisVue.isVirtualColumn(col.field)) {
              fsAry.push(col.field)
            }
          }
          root['@fs'] = fsAry.join(',')
          root['@order'] = thisVue.opts.table.order
          root['@p'] = thisVue.pagination.pageNum + ',' + thisVue.pagination.showSize
          let gql = {}
          gql[thisVue.opts.entity] = root
          console.log('gl-table > Index  > 创建的gql : ', gql)
          return gql
        }
      },
      saveData() {
      },
      toggleSidebar() {
        this.isMax = !this.isMax
      },
      isVirtualColumn(field) {
        return field === '' || field === '空' || field === '无'
      },
      initCheckbox() {
        let thisVue = this
        let $masterCheckbox = $(thisVue.$el).find('.ui.table .master.checkbox')
        let $childCheckbox = $(thisVue.$el).find('.ui.table .child.checkbox')
        $masterCheckbox.checkbox({
          onChecked: function () {
            $childCheckbox.checkbox('check')
          },
          onUnchecked: function () {
            $childCheckbox.checkbox('uncheck')
          }
        })

        $childCheckbox.checkbox({
          onChange: function () {
            let allChecked = true
            let allUnchecked = true
            thisVue.checkedIds = []
            // check to see if all other siblings are checked or unchecked
            $childCheckbox.each(function () {
              if ($(this).checkbox('is checked')) {
                thisVue.checkedIds.push(this.getElementsByTagName('input')[0].getAttribute('data-rowId'))
                allUnchecked = false
              } else {
                allChecked = false
              }
            })
            // set parent checkbox state, but dont trigger its onChange callback
            if (allChecked) {
              $masterCheckbox.checkbox('set checked')
            } else if (allUnchecked) {
              $masterCheckbox.checkbox('set unchecked')
            } else {
              $masterCheckbox.checkbox('set indeterminate')
            }
          }
        })
      },
      resetCheckbox() {
        let thisVue = this
        thisVue.checkedIds = []
        let $masterCheckbox = $(thisVue.$el).find('.ui.table .master.checkbox')
        let $childCheckbox = $(thisVue.$el).find('.ui.table .child.checkbox')
        $masterCheckbox.checkbox('uncheck')
        $childCheckbox.checkbox('uncheck')
      },
      eval(expression, ctx) {
        return utils.invoke(expression, ctx)
      },
      navPage(pageNum) {
        this.needResetPagination = false
        this.pagination.pageNum = pageNum
        this.$refs.queryForm.submit()
      },
      showSizeChange(showSize) {
        this.needResetPagination = false
        this.pagination.showSize = parseInt(showSize)
        this.$refs.queryForm.submit()
      },
      refresh() {
        console.log('gl-table > Index > refresh')
        this.submit()
      },
      submit() {
        this.needResetPagination = true
        // 调用查询子vue的查询方法
        this.$refs.queryForm.submit()
      },
      reset() {
        this.$refs.queryForm.reset()
      },
      resetPagination() {
        let thisVue = this
        if (thisVue.opts.table.p) {
          let page = thisVue.opts.table.p.split(',')
          thisVue.pagination.pageNum = parseInt(page[0])
          thisVue.pagination.showSize = parseInt(page[1])
        }
      },
      // 选择一条数据
      selectRow(row) {
        this.$emit('selectRow', row)
      },
      // query组件的查询回调，获取查询条件信息，并调用loadData查询数据，并以数据驱动刷新页面
      formQueryCallback(data) {
        this.lastMixQueryData = data.value
        // 有e，则是来源于查询操作按钮，需重置后再查询
        if (data.e) {
          this.needResetPagination = true
        }
        if (this.needResetPagination) {
          this.resetPagination()
        }
        this.loadData()
        this.selectedRows = []
      },
      clickTreeNode(data) {
        this.currentTreeNode = data
      },
      click(action, event, rowDataItem) {
        console.log('gl-table > Index > click action: ', action)
        console.log('gl-table > Index > click event: ', event)
        console.log('gl-table > Index > click rowDataItem: ', rowDataItem)
        if (action.confirm && !confirm(action.confirm)) {
          return
        }
        this.clickRow = rowDataItem
        let thisVue = this
        switch (action.click) {
          case 'modal':
            // 传递上下文的$treeNodeId给打开的页面
            let kvs = {$treeNodeId: thisVue.currentTreeNode.id, $treeNodeText: thisVue.currentTreeNode.text}
            $.extend(true, kvs, rowDataItem)
            // 对modal中的变量进行变换，转换之后才可传参给模态窗口
            let modal = utils.invoke(action.modal, kvs)
            console.log('gl-table > Index > click resolved modal: ', modal)
            if (modal.type === 'staticPage' || modal.type === 'page') {
              thisVue.$gl.ui.openVueByPath(this, modal.value, modal, {
                refreshTable: function () {
                  // 在modal中注册刷新操作
                  thisVue.submit()
                },
                close: function () {
                  // 在modal中注册刷新操作
                  thisVue.submit()
                }
              })
            } else if (modal.type === 'dynamicPage') {
              modal.opts.code = modal.value
              thisVue.$gl.ui.openVueByPath(this, '/components/gl-page-loader/Index', modal)
            } else if (modal.type === 'outerHref') {
              thisVue.$gl.ui.openOuterHref(this, modal.value, modal)
            }
            break
          case 'deleteOne':
            if (rowDataItem) {
              let keyValue = {'id|eq': rowDataItem.id}
              thisVue.$gl.data.delete(thisVue.opts.entity, keyValue).then(function () {
                thisVue.resetCheckbox()
                thisVue.submit()
              })
            }
            break
          case 'deleteMulti':
            if (thisVue.checkedIds.length !== 0) {
              let keyValue = {'id|in': thisVue.checkedIds.join(',')}
              thisVue.$gl.data.delete(thisVue.opts.entity, keyValue).then(function () {
                thisVue.resetCheckbox()
                thisVue.submit()
              })
            }
            break
          case 'xls':
            console.log('xls')
            break
          case 'word':
            console.log('export:word')
            break
          case 'pdf':
            console.log('pdf')
            break
          case 'print':
            console.log('export:print')
            break
          default:
            if (action.click.indexOf('js:') === 0) {
              utils.eval(action.click.replace('js:', ''), {opener: this.opener, modal: this.modal, data: this.clickRow})
            } else {
              console.error('该操作：' + action.click + '，未配置处理方法')
            }
            break
        }
      }
    },
    components: {TableQuery, TableTree, GlPagination}
  }
</script>
<style scoped>
</style>
