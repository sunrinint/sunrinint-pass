import { persistentMap } from "@nanostores/persistent";
import { computed } from "nanostores";

export type UserInfo = {
  name: string;
  division: string;
  email: string;
  date: string;
  barcode: string;
};

export const userInfo = persistentMap<UserInfo>("user-info", {
  name: "",
  division: "",
  email: "",
  date: "",
  barcode: "",
});

export const isEmpty = computed([userInfo], () => {
  return userInfo.get().name === "";
});

export const resetUserInfo = () => {
  userInfo.set({
    name: "",
    division: "",
    email: "",
    date: "",
    barcode: "",
  });
};
