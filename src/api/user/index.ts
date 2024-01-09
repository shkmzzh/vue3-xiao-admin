import request from "@/utils/request";
// 获取用户信息
export const getUserInfoApi = () => request({ method: "get", url: "/users/me" });
