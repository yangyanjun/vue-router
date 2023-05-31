import { History } from './base';
class HashHistory extends History {
    constructor(router) {
        super(router);
        this.router = router;

        // 确保hash模式下有一个/路径
        ensureSlash();
    }
    getCurrentLocation() {
        return getHash()
    }
    push(location) {
        this.transitionTo(location, () => { // 去更新hash值，hash值变化后虽然会再次跳转 但是不会重新更新current 会被return掉
            window.location.hash =  location;
        })
    }
    setupListener() {
        window.addEventListener('hashchange', () => {
            // 当hash值变化了 再次拿到hash值进行跳转 
            this.transitionTo(getHash()); // this是子类的实例，子类继承父类，所以子类可以拿到父类的方法
        })
    }
}
function getHash () {
    return window.location.hash.slice(1)
}
function ensureSlash() { 
    if(window.location.hash) { // location.hash 是有兼容性问题的 （可使用window.location.href再去兼容判断）
        return;
    }
    window.location.hash = '/' // 默认就是/路径即可
}

export default HashHistory;