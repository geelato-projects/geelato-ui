<template>
  <div class="ui vertical following accordion mini menu dnd-toolbox">
    <div class="item">
      <div class="title">
        默认ds
      </div>
      <div class="content">
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>表单部局容器</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'table'}">
            <form role="form">
              <div class="form-body">
                <table class="gl-form gl-col-24">
                  <tbody class="dnd-target" data-dnd-allow="tr">
                  <tr class="dnd-content" data-meta="{type:'tr'}">
                    <td colspan="24">&nbsp;
                    </td>
                  </tr>
                  </tbody>
                </table>
                <!--设计工具条模板-->
                <div class="dnd-control mt-element-overlay">
                  <div class="mt-overlay-1">
                    <!--control放置位置-->
                    <!--<div></div>-->
                    <div class="mt-overlay">
                      <ul class="mt-info">
                        <li>
                          <a class="btn default btn-outline" href="javascript:;">
                            <i class="icon-magnifier"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>分割行</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'tr'}">
            <tr>
              <td colspan="24"><span class="text">&nbsp</span></td>
            </tr>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>零标题一值</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'tr'}">
            <tr>
              <td colspan="24" class="dnd-target dnd-control" data-dnd-allow="control">&nbsp</td>
            </tr>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>一标题一值</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'tr'}">
            <tr>
              <td colspan="7">标题</td>
              <td colspan="17" class="dnd-target dnd-control" data-dnd-allow="control"></td>
            </tr>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>二标题二值</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'tr'}">
            <tr>
              <td colspan="4">标题</td>
              <td colspan="8" class="dnd-target dnd-control" data-dnd-allow="control"></td>
              <td colspan="4">标题</td>
              <td colspan="8" class="dnd-target dnd-control" data-dnd-allow="control"></td>
            </tr>
          </div>
        </div>
        <div class="dnd-item">
          <div class="dnd-dsc">
            <span class="dnd-title"><label>三行头像</label></span>
          </div>
          <toolbar></toolbar>
          <div class="dnd-content" data-meta="{type:'tr'}">
            <tr>
              <td colspan="4">title</td>
              <td colspan="8">
                <table style="width: 100%">
                  <tr>
                    <td>标题1</td>
                    <td class="dnd-target dnd-control" data-dnd-allow="control">2</td>
                  </tr>
                  <tr>
                    <td>标题2</td>
                    <td class="dnd-target dnd-control" data-dnd-allow="control">2</td>
                  </tr>
                  <tr>
                    <td>标题3</td>
                    <td class="dnd-target dnd-control" data-dnd-allow="control">2</td>
                  </tr>
                </table>
              </td>
              <td colspan="4">
                头像
              </td>
              <td colspan="8">
                <img src="#" height="84px">
              </td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dndHandler from '../../../components/designer/dndHandler'
  import toolbar from './stage/stage-toolbar'

  export default {
    data () {
      return {}
    },
    mounted: function () {
      let $items = $(this.$el).find('.dnd-item')
      dndHandler.bindDragObjects($items)
    },
    methods: {},
    components: {toolbar}
  }
</script>
<style scoped>

</style>
