<template>
  <div class="ui fullscreen modal hide">
    <i class="close icon" @click="$_close"></i>
    <div class="header" v-html="modalOpts?modalOpts.title:' '" @dblclick="isShowContent=!isShowContent">
    </div>
    <div v-show="isShowContent" class="scrolling content">
      <!--在component内的vue中，调用$emit('callModal', {fnName: paramObject})，以触发$_invokeCallbackSet-->
      <component ref="modal" :componentUpdated="isMounted=true" :is="modalBody" :opts="modalOpts.opts">
        正在加载...
      </component>
    </div>
    <div class="actions" style="text-align: center">
      <!--<div class="ui mini button" :class="$gl.ui.color.primary" @click="$_save">保存</div>-->
      <!--<div class="ui mini button" :class="$gl.ui.color.negative" @click="$_cancel">取消</div>-->
      <div v-for="(item,key) in actions" class="ui mini button" :class="$gl.ui.color[item.color]"
           @click="$_doAction(key)">
        {{item.title}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function () {
      return {
//        modalHeader:  {title: ''},
        modalBody: null,
//        modalFooter: null,
        modalOpts: {title: '', actions: []},
        // 回调事件集合 格式如：{selected:function(data){ // do something }}
        callbackSet: {},
        // 页面下方的操作按钮，通过action也可以加入一些事件，但与callbackSet不一样，actions会在modal页面中动态生成按钮
        // 在执行完该按钮绑定的事件之后，会再检查callbackSet是否有同名的方法，有的话，会执行该回调方法
        actions: {},
        isMounted: false,
        isShowContent: true
      }
    },
    created: function () {
      this.actions = {
//        $_save: {title: '保存', color: 'primary'},
//        $_cancel: {title: '取消', color: 'negative'}
      }
    },
    mounted: function () {
      $(this.$el).draggable({cancel: '.ui.modal>.content'})
    },
    methods: {
      /**
       * 关键窗口，并调用钩子 close
       * @param e
       */
      $_close: function (e) {
        let value = {}
        if (typeof this.$refs.modal.$_getValue === 'function') {
          value = this.$refs.modal.$_getValue()
        }
        console.log('get value >', value)
        $(this.$el).modal('hide')
        if (typeof this.callbackSet.close === 'function') {
          this.callbackSet.close(e, value)
        }
        return value
      },
      /**
       * 关键窗口，并调用钩子 cancel
       * @param e
       */
      $_cancel: function (e) {
        $(this.$el).modal('hide')
        if (typeof this.callbackSet.cancel === 'function') {
          this.callbackSet.cancel(e)
        }
      },
      $_callback: function (name, params) {
        let fn = this.callbackSet[name]
        if (!fn) {
          console.error('在modal的页面中，调用方法(' + name + ')失败，因为打开该modal时，未注册该方法，已注册的方法为：', this.callbackSet)
        } else {
          this.callbackSet[name](params)
        }
      },
      $_doAction: function (name, params) {
        let fn = this[name]
        if (!fn) {
          console.error('在modal的页面中，调用方法(' + name + ')失败，因为modal没有该操作按钮，当前actions为：', this.actions)
        } else {
          this[name](params)
          // 回调
          if (typeof this.callbackSet[name] === 'function') {
            this.callbackSet[name](params)
          }
        }
      },
      $_addAction: function ({name, title, color, fn}) {
        if (!this.$_checkAction(name)) {
          return
        }
        if (name === '$_cancel' || name === 'cancel') {
          this.actions[name] = {
            title: title || '取消',
            color: color || 'negative'
          }
          this[name] = fn || this.$_cancel
        } else if (name === '$_close' || name === 'close') {
          this.actions[name] = {
            title: title || '关闭',
            color: color || 'primary'
          }
          this[name] = fn || this.$_close
        } else {
          this.actions[name] = {
            title: title,
            color: color || 'primary'
          }
          this[name] = fn
        }
      },
      $_updateActions () {
        this.$forceUpdate()
      },
      $_checkAction: function (name) {
        if (name === '$_addAction' || name === '$_doAction' || name === '$_removeAction') {
          console.error('{name}是内置的action管理函数，不可添加或删除！')
          return false
        }
        return true
      }
    },
    components: {}
  }
</script>
<style scoped>
  .page-content {
    margin-left: 0;
  }
</style>
