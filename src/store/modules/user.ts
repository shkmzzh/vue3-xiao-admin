import { defineStore } from "pinia";
import { LoginApi ,logoutApi} from "@/api/auth";
import { getUserInfoApi } from "@/api/user";
import { useStorage } from "@vueuse/core";
import router from "@/router";
import type{ UserInfoType } from "@/api/user/types";
import type{ LoginData , LoginResult} from "@/api/auth/types";
import { resetRouter } from "@/router";

export const useUserStore = defineStore("user", () => {
  const TOOKEN = useStorage<LoginResult>("TOOKEN", {} as LoginResult);
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

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          TOOKEN.value.accessToken = "";
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // remove token
  function resetToken() {
    return new Promise<void>((resolve) => {
      TOOKEN.value.accessToken = "";
      TOOKEN.value.refreshToken = "";

      resetRouter();
      resolve();
    });
  }


  // 更新 token
  function changeUpdateToken(accessToken: string, refreshToken: string) {
    TOOKEN.value.accessToken = accessToken;
    TOOKEN.value.refreshToken = refreshToken;
    // TOOKEN.value.refExpTime = (jwtDecode(refreshToken) as any)?.exp * 1000 ?? 0;
  }

  return {
    TOOKEN,
    USERINFO,
    setLogin,
    logout,
    resetToken,
    changeUpdateToken,
    getUserInfo,
  };
});
