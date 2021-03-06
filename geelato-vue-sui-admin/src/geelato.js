import Vue from "vue";
import VueClipboard from 'vue-clipboard2'
import utils from "./assets/script/utils";
import PageManager from './assets/script/PageManager.js'
import SuiVue from 'semantic-ui-vue';
import Sui from './components/sui/Index.vue'
import GlToolbar from './components/gl-toolbar/Index.vue'
import GlLayout from './components/gl-layout/Index.vue'
import GlModal from './components/gl-modal/Index.vue'
import GlGroup from './components/gl-group/Index.vue'
import GlFormSimple from './components/gl-form-simple/Index.vue'
import GlFormBase from './components/gl-form-base/Index.vue'
import GlFormCombination from './components/gl-form-combination/Index.vue'
import GlLayoutPage from './components/gl-layout-page/Index.vue'
import GlMessage from './components/gl-message/Index.vue'
import GlTable from './components/gl-table/Index.vue'
import GLDropdown from './components/gl-dropdown/Index.vue'
import GLDate from './components/gl-date/Index.vue'
import GLTree from './components/gl-tree/Index.vue'
import GLTreeForm from './components/gl-tree-form/Index.vue'
import GLPageLoader from './components/gl-page-loader/Index.vue'
import {types} from './store'


/**
 *  geelato框架的配置、及工具包
 *  在各项目中不需要修改该文件
 *  可通过@see main.js设置相应的参数值
 */
const BASE_DIR = './views'
const pageManager = new PageManager()
const CONSTS = {
  SESSION_GEELATO_CONFIG_LAYOUT: 'geelato.config.layout',
  SESSION_GEELATO_CONFIG_COLOR: 'geelato.config.color',
  SESSION_GEELATO_PROFILE: 'geelato.profile'
}

class Geelato {
  constructor() {
    // vueRouter、vueStore
    this.$router = undefined
    this.$store = undefined
    this.appBase = '/m/'
    this.modules = []
    this.entityNames = {}
    this.defaultModule = 'dev'
    this.url = {}
    this.consts = CONSTS
    this.layout = {
      // 值0即为HM[MC]F：上、中（左菜单 右内容）、下
      // 值1即为LLR[HCF]，结构为左右，即左（菜单）、右（上-头部、中-内容）、下）
      // mode变化PageSidebar的背景色也调整
      mode: 1,
      header: {maxHeight: '44px', minHeight: '44px'},
      logo: {width: '182px'},
      // miniWidth
      sidebar: {maxWidth: '182px', minWidth: '0px', miniWidth: '70px'},
      // footer: {maxHeight: '22px', minHeight: '22px'}
      footer: {maxHeight: '0px', minHeight: '0px'}
    }
    // 还未开发该功能，暂禁用
    this.login = {registerEnable: false}
    this.mapAK = 'sIKTgNAqvT9Uo0yQMlr3H9B6dZADzhfT'
    this.data = {
      /**
       * 通过页面id获取页面配置
       * @param pageCode pageCode
       * @returns promise
       */
      getPageCfg: function (pageCode) {
        if (!pageCode) {
          console.error('geelato > getPageCfg > pageCode: ', '不可以为空！')
        }
        // 先从本地获取静态的，若本地无则从远程获取
        let pageCfg = pageManager.get(pageCode)
        console.log('geelato > getPageCfg >通过页面编码' + pageCode + '尝试从本地获取配置信息为：', pageCfg)
        if (!pageCfg) {
          // 远程获取
          return instance.data.getPageByCode(pageCode)
        } else {
          return new Promise((resolve, reject) => {
            console.log('geelato > getPageCfg > reject: ', reject)
            resolve({
              code: '0',
              msg: '',
              data: pageCfg
            })
          })
        }
      },
      /**
       * 加载组件文件并创建实例
       * @param componentName
       * @param opts 组件实例的propsData.opts
       * @returns {Promise}
       */
      getComponent: function (componentName, opts) {
        return new Promise((resolve, reject) => {
          let lazyLoad = (fileName, resolve) => {
            require(['./components/' + componentName + '/Index.vue'], resolve)
          }
          lazyLoad(componentName, data => {
            if (data.default.propsData) {
              data.default.propsData.opts = opts
            } else {
              data.default.propsData = {opts: opts}
            }
            resolve(new Vue(data.default).$mount())
          })
        })
      },

      /**
       *  vue文件模板
       * @param fileName
       * @returns {Promise}
       */
      // getFileTemplate: function (fileName) {
      //     return new Promise((resolve, reject) => {
      //         console.log('resolve>', resolve, reject)
      //         // let lazyLoadFn = (fileName, resolve) => { require(['../views/geemeta/gm-designer/file-template/' + fileName + '.vue'], resolve) }
      //         // resolve(new Vue(lazyLoadFn).$mount())
      //         let lazyLoad = (fileName, resolve) => {
      //             require(['./views/platform/file/designer-template/' + fileName + '.vue'], resolve)
      //         }
      //         lazyLoad(fileName, data => {
      //             resolve(new Vue(data.default).$mount())
      //         })
      //     })
      // },
      getPageByCode: function (pageCode) {
        let df = $.Deferred()
        // gql查询语句
        let gql = {
          'platform_page_config': {
            '@p': '1,1',
            '@fs': 'id,code,content',
            'code': pageCode
          }
        }
        $.ajax(instance.url.apiMetaList, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: JSON.stringify(gql),
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 通常 textStatus 和 errorThrown 之中
            // 只有一个会包含信息
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
          },
          success: function (data) {
            console.log('geelato > getPageByCode > request end: ', data)
            df.resolve(data)
            // if ($.isFunction(callback))callback(data)
          }
        })
        return df.promise()
      },
      savePage: function (page) {
        let df = $.Deferred()
        $.ajax(instance.url.apiMetaSave, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: JSON.stringify(page),
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 通常 textStatus 和 errorThrown 之中
            // 只有一个会包含信息
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
          },
          success: function (data) {
            console.debug('geelato > savePage > request end>>', data)
            df.resolve(data)
            // if ($.isFunction(callback))callback(data)
          }
        })
        return df.promise()
      },
      /**
       * @param entityName 实体名称
       * @param keyValues Object类型
       * @returns {*}
       */
      save: function (entityName, keyValues, biz, successMsg, errorMsg) {
        return instance.data.update(instance.url.apiMetaSave, entityName, keyValues, biz, successMsg || '保存成功', errorMsg || '保存失败')
      },
      /**
       * 基于gql对象进行查询
       * @param gqlObject or gqlArray
       * @param biz 业务代码
       * @returns {*}
       */
      saveByGql: function (biz, gql, successMsg, errorMsg) {
        let df = $.Deferred()
        let url = Array.isArray(gql) ? instance.url.apiMetaSave : instance.url.apiMetaSave
        let bizCode = biz || '0'
        $.ajax(url + '/' + bizCode, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: JSON.stringify(gql),
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 通常 textStatus 和 errorThrown 之中
            // 只有一个会包含信息
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
            instance.ui.showMsg(errorMsg, 'error')
          },
          success: function (data) {
            df.resolve(data)
            instance.ui.showMsg(successMsg, 'success')
          }
        })
        return df.promise()
      },
      delete: function (entityName, keyValues, biz, successMsg, errorMsg) {
        return instance.data.update(instance.url.apiMetaDelete, entityName, keyValues, biz, successMsg || '删除成功', errorMsg || '删除失败')
      },
      update: function (url, entityName, keyValues, biz, successMsg, errorMsg) {
        let bizCode = biz || '0'
        let data = {
          '@biz': bizCode
        }
        data[entityName] = keyValues || {}
        // $.extend(data[entityName], keyValues)
        let df = $.Deferred()
        $.ajax(url + '/' + bizCode, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: JSON.stringify(data),
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 通常 textStatus 和 errorThrown 之中
            // 只有一个会包含信息
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
            instance.ui.showMsg(errorMsg, 'error')
          },
          success: function (data) {
            // console.debug('geelato > update > request end>>', data)
            df.resolve(data)
            instance.ui.showMsg(successMsg, 'success')
          }
        })
        return df.promise()
      },
      /**
       * 实体查询，内部依据参数构建gql对象进行查询
       * 更复杂、高级的查询@see queryByGql
       * @param entityName e.g. platform_dev_project
       * @param keyValues 查询要件键值对 e.g. {id:123456,name:'张三'}
       * @param fieldNames 查询的列字段 e.g. id,name
       */
      query: function (entityName, keyValues, fieldNames, withMeta) {
        if (!fieldNames) {
          throw '查询列（fieldNames）不能为空。'
        }
        // gql查询语句
        let gql = {}
        gql[entityName] = {
          '@fs': fieldNames || '*'
        }
        $.extend(gql[entityName], keyValues)
        return instance.data.queryByGql(gql, withMeta)
      },
      /**
       * 批量查询
       * @param queryParamArray [{entityName:String,keyValues:{key1:value1,key2:value2,...},fieldNames:'id,name,...'},...]
       *        @see query
       */
      queryBatch: function (queryParamArray, withMeta) {
        let gqlAry = []
        for (let i in queryParamArray) {
          let queryParam = queryParamArray[i]
          let gql = {}
          gql[queryParam.entityName] = {
            '@fs': queryParam.fieldNames || '*'
          }
          $.extend(gql[queryParam.entityName], queryParam.keyValues)
          gqlAry.push(gql)
        }
        return instance.data.queryByGql(gqlAry, withMeta)
      },
      /**
       * 基于gql对象进行查询
       * @param gqlObject or gqlArray
       * @param withMeta 是否需同时查询出各列表字段的元数据信息
       * @returns {*}
       */
      queryByGql: function (gql, withMeta) {
        let df = $.Deferred()
        let url = Array.isArray(gql) ? instance.url.apiMetaMultiList : instance.url.apiMetaList
        if (withMeta === true) {
          url = url + '?withMeta=true'
        } else {
          url = url + '?withMeta=false'
        }
        $.ajax(url, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: JSON.stringify(gql),
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 通常 textStatus 和 errorThrown 之中
            // 只有一个会包含信息
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
          },
          success: function (data) {
            console.log('geelato > queryByGql > request end: ', data)
            df.resolve(data)
            // if ($.isFunction(callback))callback(data)
          }
        })
        return df.promise()
      },
      /**
       * 查询数据定义信息，即元数据信息
       * @param gqlObject or gqlArray
       * @param withMeta 是否需同时查询出各列表字段的元数据信息
       * @returns {*}
       */
      queryMeta: function (entityName) {
        let df = $.Deferred()
        let url = instance.url.apiMetaDefined + '/' + entityName
        $.ajax(url, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: '',
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
          },
          success: function (data) {
            df.resolve(data)
          }
        })
        return df.promise()
      },
      queryEntityNames: function () {
        let df = $.Deferred()
        let url = instance.url.apiMetaEntityNames + '/'
        $.ajax(url, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: '',
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
          },
          success: function (data) {
            df.resolve(data)
          }
        })
        return df.promise()
      },
      /**
       *
       * @param path 如果为最终url为/api/cache/，则path为/cache/
       * @returns {*}
       */
      queryList: function (path, data) {
        let df = $.Deferred()
        let url = instance.url.api + path
        $.ajax(url, {
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: data,
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            let options = this // 调用本次AJAX请求时传递的options参数
            console.error({
              XMLHttpRequest: XMLHttpRequest,
              textStatus: textStatus,
              errorThrown: errorThrown,
              options: options
            })
          },
          success: function (data) {
            df.resolve(data)
          }
        })
        return df.promise()
      }
    }
    this.ui = {
      /**
       * @param opener 打开页面的源vue
       * @param pageCode 配置的页面
       * @param query
       * @param data
       */
      openPage: function (opener, pageCode, query, data) {
        instance.data.getPageConfig(pageCode).then(res => {
          console.debug('geelato > openPage > res: ', res)
          let pageConfig = {}
          if (res.code === '0') {
            if (res.data) {
              pageConfig = res.data
            } else {
              console.error('geelato > openPage > 返回数据res.data为空！')
            }
          }
          let path = '../components/page/' + pageConfig.content.component + '.vue'
          instance.ui.openVueByPath(opener, path, {title: '', opts: pageConfig}, data)
        })
      },
      /**
       * 打开modal
       * @param opener 打开页面的源vue
       * @param vuePath src下的绝对路径，可以带.vue的后缀或不带，如'/@/views/xx.vue'、'/@/views/xx'、'/@/components/xx.vue'、'/@/components/xx'
       * @param vueConfig modalOpts的值 e.g. {title: '', actions: [], padding: '1.5em'}
       * @param callbackSet 回调事件集合，如：{onSelected:function(){}}
       */
      openVueByPath: function (opener, vuePath, vueConfig, callbackSet) {
        let path = vuePath.indexOf('.vue') > 0 ? vuePath : vuePath + '.vue'
        path = path.replace('/@/', '')
        // path = './views/geemeta/gm-designer/setting/icon-field-setting.vue'
        console.log('geelato > openPage > path: ', path)
        let vueComponent = resolve => require(['.' + path], resolve)
        return instance.ui.openVue(opener, vueComponent, vueConfig, callbackSet)
      },
      /**
       * @param opener
       * @param vueComponent
       * @param vueConfig e.g. {title: '', actions: [], padding: '1.5em'}
       * @param vueData
       */
      openVue: function (opener, vueComponent, vueConfig, callbackSet) {
        console.log('geelato > openVue > opener >', opener)
        console.log('geelato > openVue > modalBody >', vueComponent)
        console.log('geelato > openVue > vueConfig >', vueConfig)
        console.log('geelato > openVue > callbackSet >', callbackSet)

        let id = utils.uuid(16)
        let el = document.createElement('div')
        el.setAttribute('id', id)
        document.getElementById('app').appendChild(el)
        let GLModalComponent = Vue.component('gl-modal')
        let modalView = new GLModalComponent({
          propsData: {
            modalId: id,
            modalOpener: opener,
            modalBody: vueComponent,
            modalOpts: vueConfig,
            callbackSet: callbackSet
          }
        })
        modalView.$mount(document.getElementById(id));
        let $modal = $(modalView.$el).modal({duration: 100, closable: false, allowMultiple: true})
        $modal.modal('show')
        return $modal
      },
      openOuterHref: function (opener, href, config) {
        let vueConfig = {
          title: config.title,
          contentStyle: {padding: '0.1em', 'overflow-y': 'auto'},
          opts: {
            href: href
          }
        }
        instance.ui.openVueByPath(opener, '/components/gl-iframe/Index', vueConfig)
      },
      /**
       *
       * @param msg
       * @param type warning、info、positive|success、negative|error
       * @param title
       * @param timeout 自动关闭时间，单位毫秒，默认2000
       */
      showMsg(msg, type = 'info', title = '', timeout = 1500) {
        $('#rootMessageTarget').popup(
          {
            position: 'top center',
            target: '#rootMessageTarget',
            variation: 'basic',
            title: title,
            html: document.getElementById('rootMessageTemplate').innerHTML.replace('{msg}', msg).replace('{title}', title).replace('{type}', type),
            delay: {show: 100, hide: 0}
          }
        ).popup('show')
        window.setTimeout(hide, timeout)

        function hide() {
          $('#rootMessageTarget').popup('hide')
        }
      },
      color: {
        primary: 'blue',
        secondary: 'teal',
        positive: 'orange',
        negative: 'red'
      },
      colorHex: {
        blue: '#2185d0',
        teal: '#00b5ad',
        red: '#db2828',
        orange: '#fe9a76',
        black: '#000000',
        pink: '#FF1493'
      }

    }
    this.security = {
      login(user, remember, success) {
        // instance.security.loginDemo(user, remember, success)
        return $.ajax(instance.url.root + '/api/sys/auth/login?remember=' + remember, {
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: user,
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            instance.ui.showMsg('账号或密码不正确！', 'error')
            console.log('geelato > login > error: ', errorThrown)
          },
          success: success
        })
      },
      logout() {
        // instance.$router.push('/login')
        $.ajax(instance.url.root + '/api/sys/auth/logout', {
          // type: 'POST',
          // dataType: 'json',
          // contentType: 'application/json',
          // processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            instance.ui.showMsg('暂时不能注销！', 'warning')
            console.log(errorThrown)
          },
          success: function (data) {
            console.debug('geelato > logout > request end: ', data)
            instance.security.profile({})
            instance.$router.push('/login')
            // let reloadURL = 'index.html' + window.location.search
            // window.location.replace(reloadURL, true)
          }
        })
      },
      /**
       * 同步方法，验证是否已登录
       * @returns 用户信息profile
       */
      isLogged() {
        let result = undefined
        let self = this
        $.ajax(instance.url.root + '/api/sys/auth/isLogged', {
          async: false,
          // dataType: 'json',
          // contentType: 'application/json',
          // processData: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            self.showMsg('geelato > isLogged > 暂未能检查是否已登录！')
            console.log(errorThrown)
          },
          success: function (data) {
            if (data) {
              console.log('geelato > isLogged > res', data)
              // 转换modules的菜单格式(只支持二级级单)
              if (data.modules && data.modules.length > 0) {
                for (let i in data.modules) {
                  let module = data.modules[i]
                  console.log('geelato > module.tree: ', module.tree)
                  let menu = []
                  for (let i in module.tree) {
                    let treeNode = module.tree[i]
                    // 一级菜单
                    let menuItem = {
                      title: treeNode['tn_text'],
                      clazz: treeNode['clazz'],
                      href: treeNode['href'],
                      active: treeNode['active']
                    }
                    // 二级菜单
                    if (treeNode.items) {
                      menuItem.items = []
                      for (let iL2 in treeNode.items) {
                        let treeNodeL2 = treeNode.items[iL2]
                        let menuItemL2 = {
                          title: treeNodeL2['tn_text'],
                          clazz: treeNodeL2['clazz'],
                          href: treeNodeL2['href'],
                          active: treeNodeL2['active']
                        }
                        if (menuItemL2.href) {
                          menuItem.items.push(menuItemL2)
                        } else {
                          console.error('geelato > valid menuItem: ', menuItemL2)
                        }
                      }
                    }
                    menu.push(menuItem)
                  }
                  module.menu = menu
                  delete module.tree
                }
              }
              result = data
            } else {
              console.log('geelato > isLogged > check login state and return empty.')
            }
          }
        }).fail(function (jqXHR, textStatus, errorThrown) {
          //net::ERR_CONNECTION_REFUSED 发生时，也能进入
          console.info("geelato > isLogged: 网络出错")
        })
        return result
      },
      profile(profile) {
        if (profile !== undefined) {
          instance.$store.commit(types.CHANGE_PROFILE, profile)
          console.log('geelato > set profile>', profile)
          utils.session(CONSTS.SESSION_GEELATO_PROFILE, profile)
          console.log('geelato > get profile>', utils.session(CONSTS.SESSION_GEELATO_PROFILE))
        }
        return utils.session(CONSTS.SESSION_GEELATO_PROFILE) || {}
      }
    }
    this.ctx = {
      $root: undefined
    }
    this.copyright = {}
    this.utils = utils
    this.plugins = {}
    this.componentOption = {
      'gl-pagination': {
        pageSizes: [10, 15, 20, 30, 50, 100],
        defaultPageSize: 15
      }
    }
  }

  /**
   *
   * @param plugin plugin code or plugin config
   */
  addPlugin(plugin) {
    let pluginConfig = plugin
    if (typeof plugin === 'string') {
      pluginConfig = this.getPlugin(plugin)
    }
    console.log('geelato > addPlugin > name: ', pluginConfig.name, pluginConfig)
    // 合并模块：
    // 若不同的插件有相同的模块编码，将进行合并，从而同名模块的菜单会合并在一起
    // 若不存在同名模块，则直调加模块
    if (pluginConfig.modules) {
      for (let i in pluginConfig.modules) {
        let addingModule = pluginConfig.modules[i]
        let existing = false
        for (let addedIndex in this.modules) {
          let addedModule = this.modules[addedIndex]
          if (addedModule.code === addingModule.code) {
            // 注意，菜单级别没有再做同名检查合并
            addedModule.menu.push(...addingModule.menu)
            existing = true
            break
          }
        }
        if (!existing) {
          this.modules.push(addingModule)
        }
      }
    }
    this.plugins[pluginConfig.code] = pluginConfig
    this.entityNames[pluginConfig.code] = pluginConfig.entityNames
  }

  removePlugin(name) {
    delete this.plugins[name]
  }

  getPlugin(name) {
    let jsPath = BASE_DIR + '/' + name + '/config.js'
    return require('' + jsPath).default
  }

  setRouter(router) {
    this.$router = router
  }

  setStore(store) {
    this.$store = store
  }

  setServerUrlRoot(serverUrlRoot) {
    this.url.root = serverUrlRoot
    this.url.api = this.url.root + '/api'
    this.url.apiMetaDefined = this.url.api + '/meta/defined'
    this.url.apiMetaEntityNames = this.url.api + '/meta/entityNames'
    this.url.apiMetaList = this.url.api + '/meta/list'
    this.url.apiMetaMultiList = this.url.api + '/meta/multiList'
    this.url.apiMetaSave = this.url.api + '/meta/save'
    this.url.apiMetaDelete = this.url.api + '/meta/delete'
  }

  setHelpUrl(url) {
    this.url.help = url
  }

  setCopyright(copyright) {
    this.copyright = copyright
  }

  setColors(primary = 'blue', secondary = 'teal', positive = '', negative = 'red') {
    this.ui.color = {
      primary: primary,
      secondary: secondary,
      positive: positive,
      negative: negative
    }
  }

  /**
   * login and get config
   * addRoutes
   */
  run() {
    if (!this.url.root) {
      console.error('geelato > run > 未设置服务地址，如：geelato.setServerUrlRoot("http://localhost:8080")')
    }
    let appBase = this.appBase
    let loggedInfo = instance.security.isLogged()
    console.log('geelato > run > loggedInfo: ', loggedInfo)
    if (loggedInfo) {
      let plugin = {
        name: '系统内置默认插件',
        version: '1.0.0',
        modules: loggedInfo.modules,
        entityNames: {},
        description: '模块信息来源于平台后台配置。'
      }
      instance.addPlugin(plugin)
      instance.security.profile(loggedInfo)
    }

    let routeConfig = {
      path: appBase,
      component: GlLayout,
      meta: {
        requireAuth: true
      },
      children: []
    }
    for (let name in this.plugins) {
      routeConfig.children.push(...createModuleRoutes(this.plugins[name].modules))
    }
    this.$router.addRoutes([routeConfig])

    /**
     * 将url与文件地址一致的文件添加到路由表中，来源：
     * /{pluginName}/config.js 中的菜单链接href
     */
    function createModuleRoutes(modules) {
      if (!modules || modules.length === undefined || modules.length <= 0) {
        return []
      }
      // 从配置的菜单中，添加路由
      let routeConfigs = []
      for (let j in modules) {
        if (modules[j].index) {
          routeConfigs.push(createVueFileRoute(modules[j].index))
        }
        if (modules[j].menu) {
          for (let k in modules[j].menu) {
            let menuItemGroup = modules[j].menu[k]
            for (let l in menuItemGroup.items) {
              routeConfigs.push(createVueFileRoute(menuItemGroup.items[l].href))
            }
          }
        }
      }

      function createVueFileRoute(url) {
        console.log('geelato > createVueFileRoute > adding url: ', url)
        if (url) {
          let startIndex = url.indexOf('/#' + appBase)
          startIndex = startIndex > -1 ? startIndex + 5 : 0
          let queryIndex = url.indexOf('?')
          queryIndex = queryIndex > 0 ? queryIndex : url.length
          let path = url.substring(startIndex, queryIndex)
          console.log('geelato > createVueFileRoute > push path: ', path + '  >   ' + '../views/' + path + '.vue')
          return {
            path: path,
            component: resolve => require(['./views/' + path + '.vue'], resolve)
          }
        }
      }

      console.log('geelato > createModuleRoutes > routeConfigs: ', routeConfigs)
      return routeConfigs
    }
  }

  /**
   *  moduleCode的值为字符串时，不区分角色，登录后全部统一默认模块
   *  moduleCode的值为对象时，可按角色区分登录后的默认首模块
   * @param moduleCode string or {},e.g. {roleName1:moduleCode1,roleName2:moduleCode2...}
   */
  setStartModule(moduleCode) {
    this.defaultModule = moduleCode
  }

  getModule(moduleCode) {
    for (let i in this.modules) {
      let module = this.modules[i]
      if (module.code === moduleCode) {
        return module
      }
    }
    console.error('geelato > createModuleRoutes > getModule by code :' + moduleCode + ',return {}.')
    return {}
  }

}

let instance = new Geelato()
Vue.use(VueClipboard)
Vue.use(SuiVue)
Vue.prototype.$gl = instance
Vue.component('sui', Sui)
Vue.component('gl-sui', Sui)
Vue.component('gl-toolbar', GlToolbar)
Vue.component('gl-modal', GlModal)
Vue.component('gl-group', GlGroup)
Vue.component('gl-layout-page', GlLayoutPage)
Vue.component('gl-form-simple', GlFormSimple)
Vue.component('gl-form-base', GlFormBase)
Vue.component('gl-form-combination', GlFormCombination)
Vue.component('gl-message', GlMessage)
Vue.component('gl-table', GlTable)
Vue.component('gl-dropdown', GLDropdown)
Vue.component('gl-date', GLDate)
Vue.component('gl-tree', GLTree)
Vue.component('gl-tree-form', GLTreeForm)
Vue.component('gl-page-loader', GLPageLoader)
export default instance
