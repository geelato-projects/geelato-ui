<template>
  <!--class="gl-page-content-wrapper"-->
  <div class="">
    <layout-lr title="实体列表" right-title="实体详情">
      <div slot="left">
        <gl-group item=".list>.item">
          <div class="ui middle aligned divided selection animated list">
            <div class="item" v-for="item in entityNames" @click="$_loadMeta(item)">
              <div class="description" :class="{header:currentEntityName===item}">
                {{item}}
              </div>
            </div>
          </div>
        </gl-group>
      </div>
      <div slot="leftAction">
        <div class="item">
          <!--<a class="ui mini button" :class="$gl.ui.color.primary" @click="newPlan.state='editing'">新增</a>-->
        </div>
      </div>
      <div slot="rightAction">
        <div class="item">
          <!--<router-link-->
          <!--:to="{ path: '/m/project-base/schedule/'+projectConfig.page.planConfig, query: { id: currentPlan.id,name: currentPlan.name }}"-->
          <!--class="ui mini button" :class="$gl.ui.color.primary">编制计划-->
          <!--</router-link>-->
        </div>
      </div>
      <div slot="right">
        <table class="ui fluid compact celled table">
          <tr>
            <th>序号</th>
            <th>列名</th>
            <th>标题</th>
            <th>类型</th>
            <th>可空</th>
            <th>最大长度</th>
            <th>精度（precision）</th>
            <th>小数位数（scale）</th>
          </tr>
          <tr v-for="(item,index) in meta">
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.title}}</td>
            <td>{{item.type}}</td>
            <td>{{item.nullable}}</td>
            <td>{{item.charMaxLength}}</td>
            <td>{{item.precision}}</td>
            <td>{{item.scale}}</td>
          </tr>
        </table>
      </div>
    </layout-lr>
  </div>
</template>
<script>
  import Jstree from '../../../components/mix/jstree'
  import GlTable from '../../../components/collections/table/index'

  export default {
    props: {
      defaultEntity: {
        type: String
      }
    },
    data () {
      return {
        // 当前实体名称
        currentEntityName: '',
        // 实体名称列表
        entityNames: [],
        // 一个实体的元数据信息
        meta: []
      }
    },
    computed: {},
    created () {
      this.$_loadEntityNames()
      this.$_loadMeta(this.defaultEntity)
    },
    watch: {
      'defaultEntity': function (val, oval) {
        this.$_loadMeta(this.defaultEntity)
      }
    },
    mounted () {
    },
    updated () {
    },
    methods: {
      $_loadEntityNames () {
        let thisVue = this
        thisVue.$gl.data.queryEntityNames().then(function (res) {
          console.log(res)
          thisVue.entityNames = res.data
        })
      },
      $_loadMeta (entityName) {
        if (!entityName) {
          return
        }
        let thisVue = this
        thisVue.currentEntityName = entityName
        thisVue.$gl.data.queryMeta(thisVue.currentEntityName).then(function (res) {
          thisVue.meta = res.meta
          thisVue.$emit('select', {name: entityName, meta: thisVue.meta})
        })
      }
    },
    components: {Jstree, GlTable}
  }
</script>
<style scoped>
</style>
