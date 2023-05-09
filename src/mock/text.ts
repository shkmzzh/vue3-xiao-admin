import Moke from 'mockjs'

Moke.mock("/login","get",{
    code:200,
    message:'操作成功',
    data:[{
        path: '/demo',
        component: 'Layout',
        meta: {
          title: '组件封装',
          icon: 'menu',
          hidden: false,
          roles: [],
          keepAlive: true
        },
        children: [
          {
            component: "demo/kun",
            meta: { title: '厉不厉害你坤哥', icon: '', hidden: false, roles: [], keepAlive: true },
            name:"kun",
            path:'kun'
          }
        ]
      }]
})