import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { CaptchaResult, LoginData, LoginResult } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function LoginApi(data: LoginData): AxiosPromise<LoginResult> {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("captchaKey", data.captchaKey || "");
  formData.append("captchaCode", data.captchaCode || "");
  return request({
    url: "/auth/login",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      noToken:true
    },
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: "/auth/logout",
    method: "delete",
  });
}

/**
 * 获取验证码
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
  return request({
    url: "/auth/captcha",
    method: "get",
  });
}
