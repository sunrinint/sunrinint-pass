import { persistentMap } from "@nanostores/persistent";
import { computed } from "nanostores";

export type UserInfo = {
  name: string;
  division: string;
  email: string;
  date: string;
  barcode: string;
};

const DEFAULT_USER_INFO: UserInfo = {
  name: "",
  division: "",
  email: "",
  date: "",
  barcode: "",
};

export const userInfo = persistentMap<UserInfo>("user-info");

export const isEmpty = computed([userInfo], () => {
  return userInfo.get().name === "";
});

export const resetUserInfo = () => {
  userInfo.set(DEFAULT_USER_INFO);
  userInfo.set({
    name: "",
    division: "",
    email: "",
    date: "",
    barcode: "",
  });
};
