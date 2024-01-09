import { defineStore } from "pinia";
import { LoginApi } from "@/api/auth";
import { getUserInfoApi } from "@/api/user";
import { useStorage } from "@vueuse/core";
import router from "@/router";
import { UserInfoType } from "@/api/user/types";

export interface TookenType {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expires: any;
}
export const useUserStore = defineStore("user", () => {
  const TOOKEN = useStorage<TookenType>("TOOKEN", {} as TookenType);
  const USERINFO: UserInfoType = {
    roles: [],
    perms: [],
  };

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function setLogin(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      LoginApi(loginData)
        .then((response) => {
          console.log(response);
          TOOKEN.value = response.data;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfoType>((resolve, reject) => {
      getUserInfoApi()
        .then(({ data }) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
            return;
          }
          console.log(data);

          Object.assign(USERINFO, { ...data });
          console.log(USERINFO,'5556565 辉哥好帅');
          
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 退出登录
  function outLogin() {
    TOOKEN.value = {} as TookenType;
    // resetRouter()
    // location.reload()
    router.replace({ path: "/login" });
  }

  // 更新 token
  function changeUpdateToken(accessToken: string, refreshToken: string) {
    TOOKEN.value.accessToken = accessToken;
    TOOKEN.value.refreshToken = refreshToken;
    TOOKEN.value.refExpTime = (jwtDecode(refreshToken) as any)?.exp * 1000 ?? 0;
  }

  return {
    TOOKEN,
    USERINFO,
    setLogin,
    outLogin,
    changeUpdateToken,
    getUserInfo,
  };
});
