import Mock from 'mockjs'

// 注册
const USERS_KEY = 'users'
// 从本地存储中加载注册数据
let users: { username: string; password: string }[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

Mock.mock('/register', 'post', (options: any) => {
  const body = JSON.parse(options.body)
  const { username, password } = body
  const user = users.find((item) => item.username === username)
  if (user) {
    const response = {
      code: 201,
      message: '该用户名已被注册'
    }
    return response
  } else {
    users.push({ username, password })
    // 将注册数据保存到本地存储中
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const response = {
      code: 200,
      message: '注册成功'
    }
    return response
  }
})

// 登录
Mock.mock('/login', 'post', (options: any) => {
  const body = JSON.parse(options.body)
  const { username, password } = body
  const user = users.find((item) => item.username === username && item.password === password)
  if (user) {
    const response = {
      code: 200,
      message: '登录成功',
      data: {
        token: 'shkmzzhisveryhandsomeloveqq'
      }
    }
    return response
  } else {
    const response = {
      code: 201,
      message: '用户名或密码错误',
      data: null
    }
    return response
  }
})

// 菜单
Mock.mock('/test', 'get', {
  code: 200,
  message: '操作成功',
  data: [
    {
      path: '/demo',
      component: 'Layout',
      meta: {
        title: '组件封装',
        icon: 'menu',
        roles: ['ROOT'],
        hidden: false,
        keepAlive: true
      },

      children: [
        {
          path: 'emoji',
          component: 'demo/emoji/index',
          name: 'Emoji',
          meta: { title: '聊天框', icon: '', hidden: false, keepAlive: true, roles: ['ROOT'] }
        },
        {
          path: 'waterfall',
          component: 'demo/waterfall/index',
          name: 'Waterfall',
          meta: { title: '瀑布流', icon: '', hidden: false, keepAlive: true, roles: ['ROOT'] }
        },
        {
          path: 'upload',
          component: 'demo/upload/index',
          name: 'Upload',
          meta: { title: '文件上传', icon: '', roles: ['ROOT'], hidden: false, keepAlive: true }
        },
        {
          path: 'test',
          component: 'demo/test',
          name: 'Test',
          meta: { title: '测试', icon: '', roles: ['ROOT'], hidden: false, keepAlive: true }
        },
      ]
    }
  ]
})
