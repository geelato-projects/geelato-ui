<template lang="html">
  <div class="gl-page-content-wrapper">
    <gl-layout-page left-title="表单配置(JSON)" right-title="表单预览" :max="{left:8,right:8}" :min="{left:7,right:9}">
      <div slot="left">
        <json-code-mirror ref="jsonCM" :text="jsonCM"></json-code-mirror>
      </div>
      <div slot="leftAction">
        <sui-button size="mini" v-for="item in configs" @click="changeConfig(item.value)">加载{{item.text}}
        </sui-button>
        <sui-button size="mini" @click="genForm" :class="$gl.ui.color.primary">生成表单</sui-button>
      </div>
      <div slot="right">
        <div class="ui info attached bottom segment" v-if="values" style="word-wrap:break-word">
          {{values}}
        </div>
        <div class="ui info attached bottom segment" v-if="gql" style="word-wrap:break-word">
          {{gql}}
        </div>
        <gl-form-base v-if="current!==null" :opts="formOptions" ref="glForm">
        </gl-form-base>
      </div>
      <div slot="rightAction" v-if="current!==null">
        <div class="ui mini button" :class="$gl.ui.color.primary" @click="validate">验证表单</div>
        <div class="ui mini button" :class="$gl.ui.color.primary" @click="getValues">获取表单值</div>
        <div class="ui mini button gql" :class="$gl.ui.color.primary" @click="getGql">获取Gql</div>
        <div class="ui mini button" @click="clear">清除</div>
      </div>
    </gl-layout-page>
  </div>
</template>

<script>
  import GlFormBase from '../../../components/gl-form-base/Index'
  import JsonCodeMirror from '../../../components/gl-codemirror/Index'
  import configData from './formData.js'
  import ClipboardJS from 'clipboard'

  export default {
    name: "FormPreview",
    data() {
      return {
        configs: configData,
        current: 0,
        values: undefined,
        gql: '',
        formOptions: {ui: JSON.parse(JSON.stringify(configData[0].data))},
        jsonCM: JSON.stringify(configData[0].data)
      }
    },
    mounted() {
      this.genForm()
    },
    methods: {
      changeConfig(current) {
        this.$refs.jsonCM.setValue(JSON.stringify(configData[current].data))
        this.genForm()
      },
      genForm() {
        // console.log('this.$refs.jsonCM.getValue()', this.$refs.jsonCM.getValue())
        this.$refs.glForm.reset({ui: JSON.parse(this.$refs.jsonCM.getValue())})
      },
      validate() {
        this.$refs.glForm.validate()
      },
      clear() {
        this.clearValidateMessage()
        this.clearValues()
        this.gql = ''
      },
      clearValidateMessage() {
        this.$refs.glForm.clearValidateMessage()
      },
      getGql() {
        let gqlJson = this.$refs.glForm.getGql()
        this.gql = JSON.stringify(gqlJson)
        console.log('gqlJson>', gqlJson)
        this.copyToClipBoard('.btn.gql', this.gql)
        return this.gql
      },
      getValues() {
        this.values = JSON.stringify(this.$refs.glForm.getValues())
        this.copyToClipBoard(this.values)
        return this.values
      },
      clearValues() {
        this.values = ''
      },
      copyToClipBoard(selector, clipBoardContent) {
        // let clipboard = new ClipboardJS(selector, {
        //     text: function () {
        //         return clipBoardContent;
        //     }
        // });
      }
    },
    components: {JsonCodeMirror, GlFormBase}
  }
</script>

<style scoped>
</style>
