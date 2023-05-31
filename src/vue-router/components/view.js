export default {
    name: 'routerView',
    functional: true, // 函数式组件 特点：性能高，不用创建实例 = react函数组件
    render(h, { parent, data }) { // 调用render方法 说明他一定是一个routerView组件
        // console.log('ssss', parent, data)
        // 获取当前对应要渲染的记录
        let route = parent.$route; // this.current
        // console.log('route', route)
        
        
        let depth = 0;
        data.routerView = true;
        // App.vue中渲染组件时 默认会调用render函数，父亲中没有data.routerView属性
        // 渲染第一层，并且标识当前routerView为true
        while(parent) { // router-view的父标签
            // <app></app>
            // <template>
            //     <h1></h1>
            // </template>
            // $vnode代表的是占位符vnode 上例中 h1的$vnode指的是app
            // h1本身会转成虚拟节点，虚拟节点有个属性_vnode, _vnode.parent = $vnode;
            // console.log('+++', parent.$options.name, parent.$vnode, parent._vnode, parent.$vnode == parent._vnode?.parent)
            if(parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent; // 不停的找父亲
        }


        // 第一层router-view 渲染第一个record 第二个router-view渲染第二个

        let record = route.matched[depth]; // 获取对应层级的记录

        if(!record) {
            return h(); // 空的虚拟节点 empty-vnode   注释节点
        }

        return h(record.component, data);
    }
}