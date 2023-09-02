import { persistentAtom, persistentMap } from "@nanostores/persistent";
// import JSEncrypt from "jsencrypt";
import { computed, map } from "nanostores";
import { publicKey } from "../keys/pass";
import * as crypto from "crypto";

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

export const encryptedUserInfo = persistentAtom<string>(
  "encryptedUserInfo",
  ""
);

export const userInfo = computed(encryptedUserInfo, (encrypted): UserInfo => {
  if (encrypted === "") return DEFAULT_USER_INFO;
  const decrypted = decrypt(encrypted);
  if (!decrypted) return DEFAULT_USER_INFO;
  return JSON.parse(decrypted);
});

export const isEmpty = computed([encryptedUserInfo], () => {
  return encryptedUserInfo.get() === "" || !decrypt(encryptedUserInfo.get());
});

function decrypt(encrypted: string) {
  // const crypto = new JSEncrypt();
  // crypto.setPublicKey(publicKey);
  // return crypto.decrypt(encrypted);
  return crypto
    .publicDecrypt(publicKey, Buffer.from(encrypted, "base64"))
    .toString();
}

export const resetUserInfo = () => {
  encryptedUserInfo.set("");
};
