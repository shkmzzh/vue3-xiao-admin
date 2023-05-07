// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

const permissionRouter ={
    path: "/permission",
    component:'Layout',
    meta:{
    title: "权限路由",
    icon: "setting",
    hidden:true,
    roles:"[]",
    keepAlive:true
    },
    children:[
        {}
    ]
}
export default [
    {
        url: "/getAsyncRoutes",
        method: "get",
        response: () => {
          return {
            success: true,
            data: [permissionRouter]
          };
        }
      }
] as MockMethod[];
