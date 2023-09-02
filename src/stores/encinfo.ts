import { persistentAtom, persistentMap } from "@nanostores/persistent";
import { publicKey } from "../keys/pass";
import * as crypto from "crypto";
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

export const encryptedUserInfo = persistentAtom<string>(
  "encryptedUserInfo",
  ""
);

export function getInfo(encrypted: string): UserInfo {
  const decrypted = decrypt(encrypted);
  if (!decrypted) return DEFAULT_USER_INFO;
  return JSON.parse(decrypted);
}

function decrypt(encrypted: string) {
  return crypto
    .publicDecrypt(publicKey, Buffer.from(encrypted, "base64"))
    .toString();
}

export const isEmpty = computed([encryptedUserInfo], () => {
  console.log(encryptedUserInfo.get());
  console.log(decrypt(encryptedUserInfo.get()));
  return encryptedUserInfo.get() === "" || !decrypt(encryptedUserInfo.get());
});

export const resetUserInfo = () => {
  encryptedUserInfo.set("");
};
