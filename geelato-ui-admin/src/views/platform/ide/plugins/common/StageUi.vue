<template>
  <div class="gl-page-content-wrapper">
    <component :is="currentView" :opts="{ui:editorStore.editingPage.content.opts.ui}" :query="queryString">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
  </div>
</template>
<script>
  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      },
      editorMainHeight: {
        type: String,
        defalut: function () {
          return '480px'
        }
      }
    },
    data () {
      return {
        currentView: '',
        queryString: {},
        uiPanel: undefined
      }
    },
    watch: {
      'editorStore.editingPage.id': function (val, oldVal) {
        // 若未有page信息，则返回
        if (!val) {
          return
        }
        console.log('editorStore.editingPage.id> val:', val, 'oldVal:', oldVal)
        // 重置为未启用
        this.$_init()
      }
    },
    created: function () {
      // 组件创建完后获取数据，
    },
    mounted: function () {
      this.$_init()
      // this.$forceUpdate()
    },
    methods: {
      $_init () {
        let thisVue = this
        // 如果是从服务端加载page配置信息，此时thisVue.editorStore.editingPage已是最新的，不用本地模板panel的配置数据
        // 增加条件thisVue.editorStore.editingPage.content.component不为空，确保当服务端没有存储有效的配置信息信息，改从模板获取示例进行展示
        console.log('thisVue.editorStore.editingPage>', thisVue.editorStore.editingPage)
        if (thisVue.editorStore.editingPage && thisVue.editorStore.editingPage.isFromServer && thisVue.editorStore.editingPage.content.component) {
          thisVue.editorStore.commitOpts('ui', thisVue.editorStore.editingPage.content.opts.ui)
        } else {
          let plugin = this.editorStore.plugins[this.editorStore.editingPage.type]
          for (let index in plugin.stagePanels) {
            let panel = plugin.stagePanels[index]
            if (panel.name === 'ui') {
              // JSON序列化反序列化，确保每次新打开的模板都是新的配置信息，不是上一个页面的引用配置信息
              // 注意，这里需用需将uiPanel作为thisVue的data属性，启用Observer
              // 则否在其它vue中修改数据时，不需同步更新相关引用的数据
              thisVue.uiPanel = JSON.parse(JSON.stringify(panel))
              // console.log('uiPanel', thisVue.uiPanel, panel)
              break
            }
          }
          thisVue.editorStore.editingPage.content.component = thisVue.uiPanel.opts.component
          // thisVue.editorStore.editingPage.content.opts.ui = thisVue.uiPanel.opts.ui
          thisVue.editorStore.commitOpts('ui', thisVue.uiPanel.opts.ui)
        }
        // console.log('editorStore', thisVue.editorStore)
        // console.log('opts>', {ui: this.editorStore.editingPage.content.opts.ui})
        // console.log('query>', this.queryString)
        // thisVue.editorStore.commitOpts('json', thisVue.editorStore.editingPage.content.opts.ui)
        thisVue.currentView = resolve => require(['../../../../../' + thisVue.editorStore.editingPage.content.component.substring(1) + '.vue'], resolve)
      },
      $_focus () {
      },
      $_reset () {
      },
      $_setValue (contentString = '') {
      },
      $_commit () {
        // this.editorStore.commitOpts('ui', this.editor.getValue())
        return {code: 0, msg: ''}
      }
    },
    components: {}
  }
</script>
<style>
</style>
