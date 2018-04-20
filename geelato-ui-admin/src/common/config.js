/**
 *  geelato框架的配置，不包括vue中router、store的配置
 */
class Config {
  constructor () {
    this.modules = [
      {
        title: '新线项目中心',
        code: 'xmzx',
        html: '',
        menu: [{
          title: '项目总体信息',
          class: 'fa fa-connectdevelop',
          items: [
            {title: '项目信息台账', href: '/#/m/project-metro/center/project-list'},
            {title: '我的任务', href: '/#/m/project-base/task/project-list'}
          ]
        }]
      },
      {
        title: '新线规划',
        code: 'xxgh',
        index: '/#/m/project-base/info/select-project',
        html: '<div style="padding: 1.3em 0;text-align: center"><a class="ui mini button" href="/#/m/project-base/info/select-project">选择项目</a></div>',
        menu: [
          {
            title: '工程信息管理',
            items: [
              {title: '线路信息', href: '/#/m/project-it/info/line'},
              {title: '项目信息', href: '/#/m/project-it/info/project-info'}
            ]
          },
          {
            title: '工作事项管理',
            items: [
              {title: '计划文件配置', href: '/#/m/project-base/schedule/plan-config'},
              {title: '计划任务管理', href: '/#/m/project-base/schedule/plan-task-flow'},
              {title: '任务执行跟踪', href: '/#/m/project-base/task/index'},
              {title: '任务标准库配置', href: '/#/m/project-it/task/task-standard'},
              {title: '指标标准管理', href: '/#/m/project-base/quota/quota-config'},
              {title: '成果标准管理', href: '/#/m/project-base/achievement/achievement-config'}
            ]
          }
        ],
        active: true
      },
      {
        title: '机电工程', code: 'jdgc'
      },
      {
        title: '前期工程',
        code: 'qqgc',
        menu: [{
          title: '项目管理',
          class: 'fa fa-connectdevelop',
          items: [
            {title: '项目信息', href: '/#/m/page/project/prj-project-info-list?em=prj-project'},
            {title: '任务执行', href: '/#/m/project/task'},
            {title: '任务标准库配置', href: '/#/m/project-metro/task/task-standard'},
            {title: '指标管理', href: '/#/m/project-metro/task/quota'}
            // {title: '需求管理', href: '/#/m/project/requirement'},
            // {title: '项目报告', href: '/#/m/project/report'}
          ]
        }]
      },
      {title: '设计管理', code: 'sjgl'},
      {
        title: '土建工程',
        code: 'tjgc',
        index: '/#/m/project-base/info/select-project?module=tjgc',
        html: '<div style="padding: 1.3em 0;text-align: center"><a class="ui mini button" href="/#/m/project-base/info/select-project?module=tjgc">选择项目</a></div>',
        menu: [
          {
            title: '项目信息管理',
            items: [
              {title: '使用指引', href: '/#/m/project-metro/info/guide'},
              {title: '项目信息', href: '/#/m/project-metro/info/project-info'}
            ]
          },
          {
            title: '项目进度管理',
            items: [
              {title: '项目计划配置', href: '/#/m/project-metro/schedule/monthly-plan-config'},
              {title: '月度计划执行', href: '/#/m/project-metro/schedule/monthly-plan-execution'},
              {title: '任务执行跟踪', href: '/#/m/project/task'},
              {title: '任务标准库配置', href: '/#/m/project-metro/task/task-standard'},
              {title: '指标管理', href: '/#/m/project-metro/task/quota'},
              {title: '重大工期变更', href: '/#/m/project-metro/task/quota'}
            ]
          },
          {
            title: '项目合同管理',
            items: [
              {title: '合同信息', href: '/#/m/project-metro/contract/info'},
              {title: '合同计量', href: '/#/m/project-metro/contract/measurement'},
              {title: '合同支付', href: '/#/m/project-metro/contract/payment'},
              {title: '合同变更', href: '/#/m/project-metro/contract/change'}
            ]
          },
          {
            title: '项目安全管理',
            items: [
              {title: '......', href: '/#/m/project-metro/security/info'}
            ]
          },
          {
            title: '项目质量管理',
            items: [
              {title: '......', href: '/#/m/project-metro/quality/info'}
            ]
          },
          {
            title: '设备材料管理',
            items: [
              {title: '......', href: '/#/m/project-metro/material/info'}
            ]
          },
          {
            title: '项目报表视图',
            items: [
              {title: '项目总体视图', href: '/#/m/project-metro/report/project-index'},
              {title: '项目指标报表', href: '/#/m/project-metro/report/project-quota'},
              {title: '其它定制报表', href: '/#/m/project-metro/report/project-custom'}
            ]
          }
        ],
        active: true
      },
      {
        title: 'IT项目中心',
        code: 'itxmzx',
        index: '/#/m/project-base/center/index?module=itxmzx',
        html: '<div style="padding: 1.3em 0;text-align: center"><a class="ui mini button" href="/#/m/project-base/center/index?module=itxm">首页</a></div>',
        menu: [{
          title: '项目总体信息',
          class: 'fa fa-connectdevelop',
          items: [
            {title: '项目总体视图', href: '/#/m/project-base/center/index'},
            {title: '项目信息台账', href: '/#/m/project-metro/center/project-list'},
            {title: '我的任务', href: '/#/m/project-base/task/project-list'}
          ]
        }],
        active: true
      },
      {
        title: 'IT项目',
        code: 'itxm',
        index: '/#/m/project-base/info/select-project?module=itxm',
        html: '<div style="padding: 1.3em 0;text-align: center"><a class="ui mini button" href="/#/m/project-base/info/select-project?module=itxm">选择项目</a></div>',
        menu: [
          {
            title: '项目信息管理',
            items: [
              {title: '项目信息', href: '/#/m/project-it/info/project-info'}
            ]
          },
          {
            title: '项目进度管理',
            items: [
              {title: '计划文件配置', href: '/#/m/project-base/schedule/plan-config'},
              {title: '计划任务管理', href: '/#/m/project-base/schedule/plan-task'},
              {title: '月度计划执行', href: '/#/m/project-base/schedule/plan-execution'},
              {title: '任务执行跟踪', href: '/#/m/project/task'},
              {title: '任务标准库配置', href: '/#/m/project-it/task/task-standard'},
              {title: '指标标准管理', href: '/#/m/project-base/quota/quota-config'},
              {title: '成果标准管理', href: '/#/m/project-base/achievement/achievement-config'}
            ]
          },
          {
            title: '项目投资管理',
            items: [
              {title: '项目投资情况', href: '/#/m/project-base/invest/index'}
            ]
          },
          {
            title: '项目合同管理',
            items: [
              {title: '合同信息', href: '/#/m/project-it/contract/info'},
              {title: '合同计量', href: '/#/m/project-it/contract/measurement'},
              {title: '合同支付', href: '/#/m/project-base/contract/payment'},
              {title: '合同变更', href: '/#/m/project-it/contract/change'}
            ]
          },
          {
            title: '项目报表视图',
            items: [
              {title: '项目总体视图', href: '/#/m/project-metro/report/project-index'},
              {title: '项目指标报表', href: '/#/m/project-metro/report/project-quota'},
              {title: '其它定制报表', href: '/#/m/project-metro/report/project-custom'}
            ]
          }
        ],
        active: true
      },
      {
        title: '开发配置',
        code: 'dev',
        menu: [
          {
            title: '实施配置',
            items: [
              {title: '任务类型配置', href: '/#/m/project-metro/task/type-config'},
              {title: '任务导航流程图', href: '/#/m/project-metro/task/flow-config'}
            ]
          },
          {
            title: '设计开发',
            class: 'fa fa-connectdevelop',
            items: [
              {title: '开发项目', href: '/#/m/page/platform/platform-dev-project-list'},
              {title: 'UI设计', href: '/#/m/designer'},
              {title: 'UI预览', href: '/#/m/preview'},
              {title: '元数据管理', href: '/#/m/meta'}
            ]
          },
          {
            title: '系统管理',
            class: 'icon-settings',
            items: [
              {title: '个人信息', href: '/#/m/platform/profile/user-profile'},
              {title: '用户信息', href: '/#/m/page/sys-user/sys-user-list?em=sys-user'},
              {title: '角色信息', href: '/#/m/page/sys-role/sys-role-list?em=sys-role'},
              {title: '数据字典', href: '/#/m/page/sys-dict/sys-dict-list?em=sys-dict'}
            ]
          },
          {
            title: '开发资源',
            class: 'icon-settings',
            items: [
              {title: 'Semantic UI', href: 'http://www.semantic-ui.com', target: '-blank'},
              {title: 'Semantic UI Local', href: 'http://127.0.0.1:9778', target: '_blank'},
              {title: 'fontawesome', href: 'http://fontawesome.io/icons', target: '_blank'},
              {title: 'sui-vue', href: '/#/m/platform/ui/all-in-one'}
            ]
          }]
      }
    ]
    // 角色的默认首模块
    this.defaultModule = {
      admin: 'xmzx'
    }

    this.url = {
      root: 'http://localhost:8080'
    }
    this.url.api = this.url.root + '/api'
    this.url.apiMetaList = this.url.api + '/meta/list'
    this.url.apiMetaMultiList = this.url.api + '/meta/multiList'
    this.url.apiMetaSave = this.url.api + '/meta/save'
    this.url.apiMetaDelete = this.url.api + '/meta/delete'

    this.color = {
      primary: 'blue',
      secondary: 'teal',
      positive: 'teal',
      negative: 'red'
      // background: '#FFE8E6', rgba(0, 181, 173, 0.15)
      // background: '#2185d0' // 'rgba(230, 230, 230, 0.35)'
    }
    this.colorHex = {
      blue: '#2185d0', teal: '#00b5ad', red: '#db2828', orange: '#fe9a76', black: '#000000', pink: '#FF1493'
    }
    this.layout = {
      logo: {width: '130px'},
      // 值0即为HM[MC]F：上、中（左菜单 右内容）、下
      // 值1即为LLR[HCF]，结构为左右，即左（菜单）、右（上-头部、中-内容）、下）
      // mode变化PageSidebar的背景色也调整
      mode: 1,
      header: {maxHeight: '44px', minHeight: '44px'},
      // miniWidth
      sidebar: {maxWidth: '170px', minWidth: '0px', miniWidth: '70px'},
      // footer: {maxHeight: '22px', minHeight: '22px'}
      footer: {maxHeight: '0px', minHeight: '0px'}
    }
    // 还未开发该功能，暂禁用
    this.login = {registerEnable: false}
  }
}

let instance = new Config()
export default instance
