export default {
    name: 'routerLink',
    props: { // 属性接收
        to: {
            type: String,
            require: true,
            default: '/'
        },
        tag: {
            type: String,
            default: 'a',
        }
    }, // 写组件库 都可以采用jsx 来写 量会少很多 
    methods: {
        handler(to) {
            this.$router.push(to);
        }
    },
    render() {
        let { tag, to } = this;
        // jsx 语法   绑定事件
        return <tag onClick={this.handler.bind(this, to)}>{this.$slots.default}</tag>;
    }
}