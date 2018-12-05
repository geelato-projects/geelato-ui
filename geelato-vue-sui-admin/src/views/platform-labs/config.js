export default {
    name: '实验室',
    version: '0.1.0',
    modules: [
        {
            title: '组件示例',
            code: 'labs',
            index: '/#/m/platform-labs/ui/Index',
            resize: 'min',
            html: '',
            menu: [
                {
                    title: '组件集合',
                    class: '',
                    items: [
                        {title: 'SUI封装', href: '/#/m/platform-labs/ui/Index'},
                        {title: 'bugs', href: '/#/m/platform-labs/bugs/dropdown/DropdownInSlot'},
                        {title: 'SUI-VUE', href: '/#/m/platform-labs/ui/Sui'},
                        {title: 'SplitExampleOne', href: '/#/m/platform-labs/split/ExampleOne'},
                        {title: 'SplitMix', href: '/#/m/platform-labs/split/Index'}
                    ],
                    active: true
                }]
        },
    ],
    entityNames: {}
}