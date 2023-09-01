import { persistentMap } from "@nanostores/persistent";
import { computed } from "nanostores";

export type UserInfo = {
  name: string;
  division: string;
  email: string;
  date: string;
  barcode: string;
};

// const DEFAULT_USER_INFO: UserInfo = {
//   name: "백시현",
//   division: "콘텐츠디자인과",
//   email: "22sunrin208@sunrint.hs.kr",
//   date: "2022.03.02 ~ 2025.02.28",
//   barcode: "S2220208",
// };

const DEFAULT_USER_INFO: UserInfo = {
  name: "",
  division: "",
  email: "",
  date: "",
  barcode: "",
};

export const userInfo = persistentMap<UserInfo>("user-info", DEFAULT_USER_INFO);

export const isEmpty = computed([userInfo], () => {
  return userInfo.get().name === "";
});

export const resetUserInfo = () => {
  userInfo.set(DEFAULT_USER_INFO);
};
