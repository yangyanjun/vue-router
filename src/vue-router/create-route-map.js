export default function createRouteMap(routes, oldRouteMap) {
    let pathMap = oldRouteMap || Object.create(null); // 默认没有传递就是直接创建映射关系

    routes.forEach(route => {
        addRouteRecord(route, pathMap)
    })

    return {
        pathMap,
    }
}
// 先序深度遍历
function addRouteRecord(route, pathMap, parent) {

    // 当访问 / 时 ，应该渲染Home组件 / => { Home } 一对多的关系，还可能有别的属性
    const { name, component, children } = route;
    const path = parent ? `${parent.path }/${route.path}` : route.path;
    const record = {
        path,
        name,
        component,
        parent,
    }
    if(!pathMap[path]) { // 不能定义重复的路由 否则只生效第一个
        pathMap[path] = record;
    }
    if(children) {
        children.forEach(childRoute => {
            // 在遍历儿子时 将父亲的记录传入进去
            addRouteRecord(childRoute, pathMap, record)
        })
    }
}