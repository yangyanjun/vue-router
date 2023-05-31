import createRouteMap from "./create-route-map"
import { createRoute } from "./history/base";

export default function createMatcher(routes) {
    // pathMap = {'/': Home, '/about': About, '/about/a': aboutA, '/about/b': aboutB }


    const { pathMap } = createRouteMap(routes); // 扁平化配置
    // console.log(pathMap)

    function addRoutes(routes) {
        createRouteMap(routes, pathMap)
        // console.log('33', pathMap)
    }
    function match(location) {
        const record = pathMap[location]; // 可能一个路径有多个记录
        if(record) {
            return createRoute(record, {
                path: location,
            });
        }
        // 这个记录可能没有 
        return createRoute(null, {
            path: location, 
        });
    }

    return {
        addRoutes, // 动态添加路由
        match // 用于匹配路由 
    }
}