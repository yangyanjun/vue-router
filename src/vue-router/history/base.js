export function createRoute(record, location) {
    const res = []; // [/about, /about/a]
    while(record) {
        res.unshift(record);
        record = record.parent;
    }
    return {
        ...location,
        matched: res
    }
}
function runQueue(queue, iterator, cb) {
    function step(index) {
        if(index>=queue.length) return cb();
        const hook = queue[index];
        iterator(hook, () => {step(index+1)})
    }
    step(0);
}
class History {
    constructor(router) {
        this.router = router;

        // 当我们创建完路由后，先有一个默认值 路径 和 匹配到的记录做成一个映射表
        // /about/a => matches: [Record, record] 当有子路由时，会先渲染父路由组件、再子路由组件
        // 默认当创建history时 路径应该是/ 并且匹配到的记录是[]
        this.current = createRoute(null, {
            path:'/'
            // name: '',
        });
        // console.log(this.current)
        // this.current = { path: '/', matched: []}


    }
    listen(cb) {
        this.cb = cb;
    }
    transitionTo(location, onComplete) {
        // 跳转时都会调用此方法 from...to...
        // 路径变化了 视频还要更新 响应式数据原理
        // console.log(location)
        
        const route = this.router.match(location); // {path: '/', matched: [,]}
        // 这个route 就是当前最新的匹配到的结果
        
        // 防止重复跳转
        if(location === this.current.path && route.matched.length === this.current.matched.length) return;
        
        let queue = [].concat(this.router.beforeHooks); // 拿到了注册方法

        const iterator = (hook, next) => {
            hook(this.current, route, ()=> {
                next();
            })
        }
        runQueue(queue, iterator, () => {
            // 在更新之前先调用注册号的导航守卫

            this.updateRoute(route);
            // 根据路径加载不同的组件 this.route.matcher.match(location) 组件
            // 渲染组件
            onComplete && onComplete()
        })
        
    }
    updateRoute(route) {
        // 每次你更新的是 current
        this.current = route; // 每次路由切换都会更改current属性
        this.cb && this.cb(route)
        
        // 试图重新渲染有几个要求？ 1.模板中要用 2.current得是响应式

    }
}
export {
    History,
}