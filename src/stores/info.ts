import { persistentAtom, persistentMap } from "@nanostores/persistent";
import { computed, map } from "nanostores";
import { publicKey } from "../keys/pass";
import NodeRSA from "node-rsa";

export type UserInfo = {
  name: string;
  division: string;
  email: string;
  date: string;
  barcode: string;
  profile?: string;
  birth?: string;
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

export const userInfo = computed([encryptedUserInfo], (encrypted): UserInfo => {
  if (encrypted === "") return DEFAULT_USER_INFO;
  const decrypted = decrypt(encrypted);
  if (!decrypted) return DEFAULT_USER_INFO;
  return JSON.parse(decrypted);
});

export const isEmpty = computed([encryptedUserInfo], () => {
  return encryptedUserInfo.get() === "" || !decrypt(encryptedUserInfo.get());
});

function decrypt(encrypted: string) {
  const module = new NodeRSA(publicKey);
  return module.decryptPublic(encrypted, "utf8");
}

export const resetUserInfo = () => {
  encryptedUserInfo.set("");
};
