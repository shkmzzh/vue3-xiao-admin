import request from "@/utils/request";

/**
 * 获取路由列表
 */
export function listRoutesApi() {
  return request({
    url: "/menus/routes",
    method: "get",
  });
}
