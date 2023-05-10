import Moke from 'mockjs'

Moke.mock("/test","get",{
    code:200,
    message:'操作成功',
    data:[{
        path: '/demo',
        component: 'Layout',
        meta: {
          title: '组件封装',
          icon: 'menu',
          hidden: false,
          roles: ["ROOT"],
          
        },
        keepAlive: true,
        children: [
          {
            path:'kun',
            component: "demo/kun",
            name:"kun",
            meta: { title: '厉不厉害你坤哥', icon: '', hidden: false, roles: ['ROOT'], },
            keepAlive: true
          }
        ]
      }]
})