<template>
  <div class="ui top borderless menu gm-layout-header" :class="headerClass">
    <div class="left menu">
      <div class="ui item dropdown" :style="{width:logoWidth}" v-if="isShowLogo()">
        <div class="text">
          <!--<img class="ui avatar image" src="../../../static/images/logo/48x48.png">-->
          <span style="font-weight: bold;font-size: 1.25em;margin-left: -13px;">DEMO</span>
        </div>
      </div>
      <a class="gl-layout-sidebar-toggle item">
        <i class="sidebar icon"></i>
      </a>
      <div class="item">
        <div v-html="titleHtml"></div>
      </div>
    </div>
    <div class="right menu">
      <a class="item">
        <i class="icon mail"></i>
        <div class="floating ui circular mini red label" style="margin:0 0 0 -2.5em!important;top:0.5em">22
        </div>
      </a>

      <div class="ui right item inline dropdown" @click="$_profile">
        <div class="text">
          <img class="ui avatar image" src="../../../static/images/avatar/large/jenny.jpg">
          {{user.name}}
        </div>
      </div>
      <sui type="popup" selector=".item" :opts="{
          inline: true,
          hoverable: true,
          position: 'bottom center',
          delay: {
            show: 100,
            hide: 100
          }
        }">
        <a class="item"><i class="theme icon"></i></a>
        <div class="ui flowing popup top left transition hidden">
          <div v-for="(hex,key) in $gl.ui.colorHex" class="ui mini button" :class="{[key]:true}"
               @click="$_changeColor(key)"></div>
        </div>
      </sui>
      <!--<a class="item" title="mode" @click="$_changeTheme"><i class="paint-brush icon"></i></a>-->
      <a class="item" title="更改部局" @click="$_changeLayoutMode"><i class="exchange alternate icon"></i></a>
      <a class="item" title="帮助" @click="$_help"><i class="question circle outline icon"></i></a>
      <a class="item" title="退出" @click="logout"><i class="sign out icon"></i></a>
      <sui v-if="modules&&modules.length>0" type="popup" selector=".modules-selector" :opts="{
          inline: true,
          hoverable: true,
          position: 'bottom left',
          delay: {
            show: 100,
            hide: 100
          }
        }">
        <a class="item modules-selector"><i class="ellipsis vertical icon"></i></a>
        <div class="ui flowing popup top left transition hidden">
          <div class="ui three column divided left aligned grid" style="max-width: 390px">
            <div class="column" v-for="item in modules" style="padding:0.125em">
              <div class="ui button" @click="$_changeModule(item)" style="width: 9em">
                {{item.title}}
              </div>
            </div>
          </div>
        </div>
      </sui>
    </div>
  </div>
</template>

<script>
  import config from '../../common/config'
  import utils from '../../common/utils'
  import * as types from '../../store/types'
  import Sui from '../../components/sui/index.vue'

  export default {
    props: {
      mode: Number,
      size: String
    },
    data () {
      return {
        color: this.$gl.ui.color.primary,
        user: this.$gl.security.profile().user,
        logoWidth: config.layout.logo.width,
        modules: config.modules,
        showModuleSelect: false
      }
    },
    computed: {
      titleHtml: function () {
        return this.$store.state.platform.headerTitle
      }
    },
    created: function () {
      this.headerClass = this.mode === 1 ? '' : 'inverted ' + this.$gl.ui.color.primary
      // 首次加载切换到角色的默认模块
      // TODO 改从当前用户信息中获取
      let currentRole = 'admin'
      for (var m in this.modules) {
        var module = this.modules[m]
        console.log(module, config.defaultModule[currentRole])
        if (module.code === config.defaultModule[currentRole]) {
          this.$_changeModule(module)
          break
        }
      }
    },
    mounted: function () {
    },
    methods: {
      isShowLogo: function () {
        return this.mode === 0
      },
      $_changeModule: function (module) {
        console.log('module>', module)
        // 通知更改模块，以便更改菜单
        this.$store.commit(types.CHANGE_MODULE, module)
        this.$emit('changeModule', module)
        // 更改模块首页面
        if (module.index) {
          // 如将：'/#/m/project-metro/info/select-project',改为'/m/project-metro/info/select-project',
          var path = module.index.replace('/#', '').replace('#', '')
//          path = path + '?' + 'module=' + module.code + '&t=' + utils.uuid(16)
          this.$store.commit(types.ROUTE_VIEW_KEY, utils.uuid(16))
          this.$router.push(path)
        } else {
          console.error('未配置模块[' + module.title + ']首页面！')
        }
      },
      $_changeColor: function (newColor) {
        let lastColor = this.color + ''
        this.color = newColor
        this.$emit('changeColor', this.color, lastColor)
      },
      $_changeLayoutMode: function () {
        this.$emit('changeLayoutMode', (this.mode + 1) % 2)
      },
      $_profile: function () {
        this.$router.push('/m/platform/profile/user-profile')
      },
      $_help: function () {
      },
      $_color: function (color) {
      },
      logout: function () {
        this.$gl.security.logout()
      }
    },
    components: {Sui}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
