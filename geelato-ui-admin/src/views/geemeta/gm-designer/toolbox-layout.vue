<template>
  <div class="ui vertical mini menu dnd-toolbox dnd-sidebar">
    <div class="ui accordion item">
      <div class="title active">
        DIV布局(Grid-16)
      </div>
      <base-layout :class="['active']"></base-layout>
    </div>
    <div class="ui accordion item">
      <div class="title">
        表格部局(Table)
      </div>
      <div class="content">
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>16*16 表格</label></span>
          </div>
          <toolbar></toolbar>
          <!--data-meta="{type:'table',ui:'HandsonTable'}"-->
          <div class="dnd-content" data-meta="{type:'table'}">
            <div class="gl-table-layout">
              <div class="ui grey segment">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui accordion item">
      <div class="title">
        常用部局页面
      </div>
      <div class="content">
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>两列 3-9</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'collection',ui:'grid'}">
            常用部局页面 TODO
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dndHandler from '../../../components/designer/dndHandler'
  import toolbar from './stage/stage-toolbar'
  import baseLayout from './toolbox-layout-base'

  export default {
    data () {
      return {}
    },
    mounted: function () {
      let $items = $(this.$el).find('.dnd-item')
//      $items.mouseover(function (e) {
//        $(e.target).addClass('active')
//      })
//      $items.mouseout(function (e) {
//        $(e.target).removeClass('active')
//      })
      dndHandler.bindDragObjects($items)
      $(this.$el).find('.ui.accordion').accordion()
    },
    methods: {},
    components: {toolbar, baseLayout}
  }
</script>
<style scoped>

</style>
