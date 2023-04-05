import create from "zustand";
import { devtools } from "zustand/middleware";
import LocalStorageService from "./LocalStorageService";


const useUserStore = create((set) => ({

  isLogin: LocalStorageService.getUserToken() ? true : false,
  loginPopup: false,
  userInfo: null,
  setUserInfo: (data) => {
    set((state) => ({
      loginPopup: false,
      isLogin: true,
      userInfo: data,
    }));
  },
  removeUserInfo: (data) => {
    set((state) => ({
      isLogin: false,
    }));
  },
  showLogin: (data) => {
    set((state) => ({
      ...state,
      loginPopup: data,
    }));
  },
  synchronized: (data) => {
    set((state) => ({
      isLogin: LocalStorageService.getUserToken() ? true : false,
      loginPopup: false,
      userInfo: null,
    }));
  },
}));
export default useUserStore;
