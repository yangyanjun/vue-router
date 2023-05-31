import Link from './components/link';
import View from './components/view';
export let _Vue;
// 主要做了mixin
export default function install(Vue, options) {
    // 插件安装的入口

    _Vue = Vue; // 这样别的文件都可以使用Vue变量



    // 给所有组件都混入一个属性 router
    Vue.mixin({
        beforeCreate() { // this 指向的是当前组件的实例
            // 将父亲传入的router实例共享给所有的子组件
            if(this.$options.router) {
                // console.log('this1', this)
                // console.log('父亲', this.$options.name)
                this._routerRoot = this;
                this._router = this.$options.router;
                this._router.init(this); // 这里的this就是根实例
                // 如何获取到current属性 将current属性定义在_route上
                Vue.util.defineReactive(this, '_route', this._router.history.current)
                
                // 当current变化后 更新_route属性
                // 如果current中的path或者matched的其他属性变化 也是响应式的

            } else {
                // console.log('this2', this)
                // console.log('儿子', this.$options.name)
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }

            // 这样 无论是父组件还是子组件 都可以通过 this._routerRoot._router 获取共同的路由实例
        }
    })


    // 插件一般用于定义全局组件、全局指令、过滤器、原型方法....
    Vue.component('router-link', Link)
    Vue.component('router-view', View)
    // 代表路由中所有的属性
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route; // path matched
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router; // 方法 go push replace
        }
    })
}